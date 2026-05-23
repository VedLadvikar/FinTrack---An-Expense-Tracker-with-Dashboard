import { useState, useEffect, useCallback } from "react";
import transactionService from "../services/transactionService";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionForm from "../components/transactions/TransactionForm";
import Modal from "../components/common/Modal";
import ConfirmModal from "../components/common/ConfirmModal";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

const DEFAULT_FILTERS = {
    search: "",
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [page, setPage] = useState(1);

    const [showForm, setShowForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deletingTransaction, setDeletingTransaction] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page, limit: 10 };
            if (filters.search) params.search = filters.search;
            if (filters.type !== "all") params.type = filters.type;
            if (filters.category !== "all") params.category = filters.category;
            if (filters.startDate) params.startDate = filters.startDate;
            if (filters.endDate) params.endDate = filters.endDate;

            const response = await transactionService.getTransactions(params);
            if (response.success) {
                setTransactions(response.data.transactions);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const [searchTimeout, setSearchTimeout] = useState(null);
    const handleFiltersChange = (newFilters) => {
        if (newFilters.search !== filters.search) {
            if (searchTimeout) clearTimeout(searchTimeout);
            const timeout = setTimeout(() => {
                setPage(1);
                setFilters(newFilters);
            }, 400);
            setSearchTimeout(timeout);
        } else {
            setPage(1);
            setFilters(newFilters);
        }
    };

    const handleClearFilters = () => {
        setPage(1);
        setFilters(DEFAULT_FILTERS);
    };

    const handleAdd = async (data) => {
        setSubmitting(true);
        try {
            const response = await transactionService.addTransaction(data);
            if (response.success) {
                toast.success("Transaction added successfully");
                setShowForm(false);
                fetchTransactions();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add transaction");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (data) => {
        setSubmitting(true);
        try {
            const response = await transactionService.updateTransaction(
                editingTransaction._id,
                data
            );
            if (response.success) {
                toast.success("Transaction updated");
                setEditingTransaction(null);
                fetchTransactions();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update transaction");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            const response = await transactionService.deleteTransaction(
                deletingTransaction._id
            );
            if (response.success) {
                toast.success("Transaction deleted");
                setDeletingTransaction(null);
                fetchTransactions();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete transaction");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-5" style={{ animation: "fade-in 0.35s ease-out" }}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[#1f1f1f] text-2xl font-bold tracking-tight mb-0.5">
                        Transactions
                    </h1>
                    <p className="text-[#7c7c7c] text-sm">
                        Manage your income and expenses
                    </p>
                </div>
                <Button onClick={() => setShowForm(true)}>
                    <LuPlus size={15} strokeWidth={2.5} />
                    Add New
                </Button>
            </div>

            {/* Filters */}
            <TransactionFilters
                filters={filters}
                onChange={handleFiltersChange}
                onClear={handleClearFilters}
            />

            {/* Transaction List */}
            <TransactionList
                transactions={transactions}
                pagination={pagination}
                loading={loading}
                onEdit={(t) => setEditingTransaction(t)}
                onDelete={(t) => setDeletingTransaction(t)}
                onPageChange={setPage}
                onAddNew={() => setShowForm(true)}
            />

            {/* Add Transaction Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Transaction">
                <TransactionForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowForm(false)}
                    loading={submitting}
                />
            </Modal>

            {/* Edit Transaction Modal */}
            <Modal
                isOpen={!!editingTransaction}
                onClose={() => setEditingTransaction(null)}
                title="Edit Transaction"
            >
                <TransactionForm
                    initialData={editingTransaction}
                    onSubmit={handleEdit}
                    onCancel={() => setEditingTransaction(null)}
                    loading={submitting}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!deletingTransaction}
                onClose={() => setDeletingTransaction(null)}
                onConfirm={handleDelete}
                title="Delete Transaction"
                message={`Are you sure you want to delete "${deletingTransaction?.description}"? This action cannot be undone.`}
                loading={submitting}
            />
        </div>
    );
}
