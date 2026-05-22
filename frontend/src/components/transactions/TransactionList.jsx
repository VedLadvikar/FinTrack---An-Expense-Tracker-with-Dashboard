import TransactionItem from "./TransactionItem";
import EmptyState from "../common/EmptyState";
import { SkeletonRow } from "../common/Skeleton";
import { LuArrowLeftRight } from "react-icons/lu";


export default function TransactionList({
    transactions,
    pagination,
    loading,
    onEdit,
    onDelete,
    onPageChange,
    onAddNew,
}) {
    if (loading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <EmptyState
                icon={LuArrowLeftRight}
                title="No transactions yet"
                message="Start tracking your finances by adding your first income or expense."
                actionLabel="Add Transaction"
                onAction={onAddNew}
            />
        );
    }

    return (
        <div>
            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction._id}
                        transaction={transaction}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="px-4 py-2 text-sm rounded-xl bg-jet-black-900 text-black-200 hover:bg-jet-black-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-black-400 px-3">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.pages}
                        className="px-4 py-2 text-sm rounded-xl bg-jet-black-900 text-black-200 hover:bg-jet-black-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
