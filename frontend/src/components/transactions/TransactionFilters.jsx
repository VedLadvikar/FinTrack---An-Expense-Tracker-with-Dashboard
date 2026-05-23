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
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-4 space-y-3 shadow-[0px_4px_12px_rgba(0,0,0,0.04)]">
            {/* Search */}
            <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c7c7c]" />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={filters.search || ""}
                    onChange={handleChange("search")}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-[#1f1f1f] placeholder-[#adadad] outline-none text-sm focus:border-[#0b516a] focus:shadow-[0_0_0_3px_rgba(11,81,106,0.1)] transition-all"
                />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3">
                {/* Type Filter */}
                <select
                    value={filters.type || "all"}
                    onChange={handleChange("type")}
                    className="px-3 py-2 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] transition-colors cursor-pointer"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                {/* Category Filter */}
                <select
                    value={filters.category || "all"}
                    onChange={handleChange("category")}
                    className="px-3 py-2 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] transition-colors cursor-pointer"
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
                    className="px-3 py-2 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] transition-colors cursor-pointer"
                />
                <input
                    type="date"
                    value={filters.endDate || ""}
                    onChange={handleChange("endDate")}
                    className="px-3 py-2 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] transition-colors cursor-pointer"
                />

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#7c7c7c] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    >
                        <LuX className="w-3.5 h-3.5" />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
