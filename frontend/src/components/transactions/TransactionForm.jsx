import { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Business", "Other"];
const EXPENSE_CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];


export default function TransactionForm({ initialData, onSubmit, onCancel, loading }) {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type || "expense",
                category: initialData.category || "",
                amount: initialData.amount?.toString() || "",
                description: initialData.description || "",
                date: initialData.date
                    ? new Date(initialData.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
            });
        }
    }, [initialData]);

    const categories = formData.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const handleTypeChange = (type) => {
        setFormData((prev) => ({
            ...prev,
            type,
            category: isEditing && prev.type === type ? prev.category : "",
        }));
    };

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Toggle */}
            <div>
                <label className="text-sm font-medium text-[#1f1f1f] mb-2 block">
                    Type
                </label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleTypeChange("income")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
                            formData.type === "income"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-[#faf9f7] text-[#7c7c7c] border-[#ece7e2] hover:bg-[#ece7e2]"
                        }`}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange("expense")}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
                            formData.type === "expense"
                                ? "bg-[#f4c7a8]/30 text-[#c97a45] border-[#f4c7a8]"
                                : "bg-[#faf9f7] text-[#7c7c7c] border-[#ece7e2] hover:bg-[#ece7e2]"
                        }`}
                    >
                        Expense
                    </button>
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm font-medium text-[#1f1f1f]">
                    Category <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange("category")}
                    required
                    className="w-full px-3 py-2.5 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-[#1f1f1f] outline-none transition-all duration-150 text-sm focus:border-[#0b516a] focus:shadow-[0_0_0_3px_rgba(11,81,106,0.1)] cursor-pointer"
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                id="amount"
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={handleChange("amount")}
                placeholder="Enter amount"
                required
                min="0.01"
                step="0.01"
            />

            {/* Description */}
            <Input
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleChange("description")}
                placeholder="e.g. Grocery shopping at BigBasket"
                required
            />

            {/* Date */}
            <Input
                id="date"
                label="Date"
                type="date"
                value={formData.date}
                onChange={handleChange("date")}
                required
            />

            <div className="flex gap-3 pt-2">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    fullWidth
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    loading={loading}
                >
                    {isEditing ? "Update" : "Add"} Transaction
                </Button>
            </div>
        </form>
    );
}
