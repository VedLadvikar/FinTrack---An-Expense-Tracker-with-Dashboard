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
                <label className="text-sm font-medium text-black-200 mb-2 block">
                    Type
                </label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleTypeChange("income")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                            formData.type === "income"
                                ? "bg-income/15 text-income border border-income/30"
                                : "bg-jet-black-900 text-black-400 border border-jet-black-800 hover:bg-jet-black-800"
                        }`}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange("expense")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                            formData.type === "expense"
                                ? "bg-expense/15 text-expense border border-expense/30"
                                : "bg-jet-black-900 text-black-400 border border-jet-black-800 hover:bg-jet-black-800"
                        }`}
                    >
                        Expense
                    </button>
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm font-medium text-black-200">
                    Category <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange("category")}
                    required
                    className="w-full px-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-50 outline-none transition-all duration-200 text-sm focus:border-almond-cream-400 focus:ring-2 focus:ring-almond-cream-400/20 appearance-none cursor-pointer"
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
