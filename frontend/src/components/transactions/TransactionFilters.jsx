import { LuSearch, LuX } from "react-icons/lu";

const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Business", "Other"];
const EXPENSE_CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];


export default function TransactionFilters({ filters, onChange, onClear }) {
    const handleChange = (field) => (e) => {
        const newFilters = { ...filters, [field]: e.target.value };

        if (field === "type") {
            newFilters.category = "all";
        }
        onChange(newFilters);
    };

    const categories =
        filters.type === "income"
            ? INCOME_CATEGORIES
            : filters.type === "expense"
            ? EXPENSE_CATEGORIES
            : [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];

    const hasActiveFilters =
        filters.search ||
        (filters.type && filters.type !== "all") ||
        (filters.category && filters.category !== "all") ||
        filters.startDate ||
        filters.endDate;

    return (
        <div className="glass-card p-4 space-y-3 animate-fade-in">
            {/* Search */}
            <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black-600" />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={filters.search || ""}
                    onChange={handleChange("search")}
                    className="w-full pl-10 pr-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-50 placeholder-black-600 outline-none text-sm focus:border-almond-cream-400 focus:ring-2 focus:ring-almond-cream-400/20 transition-all"
                />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3">
                {/* Type Filter */}
                <select
                    value={filters.type || "all"}
                    onChange={handleChange("type")}
                    className="px-3 py-2 bg-jet-black-900 border border-black-700 rounded-xl text-sm text-black-200 outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                {/* Category Filter */}
                <select
                    value={filters.category || "all"}
                    onChange={handleChange("category")}
                    className="px-3 py-2 bg-jet-black-900 border border-black-700 rounded-xl text-sm text-black-200 outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Date Range */}
                <input
                    type="date"
                    value={filters.startDate || ""}
                    onChange={handleChange("startDate")}
                    className="px-3 py-2 bg-jet-black-900 border border-black-700 rounded-xl text-sm text-black-200 outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={filters.endDate || ""}
                    onChange={handleChange("endDate")}
                    className="px-3 py-2 bg-jet-black-900 border border-black-700 rounded-xl text-sm text-black-200 outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                    placeholder="End Date"
                />

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-black-400 hover:text-red-400 hover:bg-stone-brown-500/10 transition-all cursor-pointer"
                    >
                        <LuX className="w-3.5 h-3.5" />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
