import { useState } from "react";
import reportService from "../services/reportService";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuDownload, LuFileSpreadsheet, LuCalendar, LuFilter } from "react-icons/lu";


export default function ReportsPage() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("all");
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(false);

    const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Business", "Other"];
    const EXPENSE_CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];
    const ALL_CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];

    const categories =
        type === "income"
            ? INCOME_CATEGORIES
            : type === "expense"
            ? EXPENSE_CATEGORIES
            : ALL_CATEGORIES;

    const handleExport = async () => {
        setLoading(true);
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (type !== "all") params.type = type;
            if (category !== "all") params.category = category;

            await reportService.exportReport(params);
            toast.success("Report downloaded successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to export report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-black-50 mb-1">Reports</h1>
                <p className="text-sm text-black-400">
                    Export your financial records to Excel
                </p>
            </div>

            {/* Export Card */}
            <div className="glass-card p-6 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-almond-cream-400/10 flex items-center justify-center">
                        <LuFileSpreadsheet className="w-6 h-6 text-almond-cream-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-black-50">
                            Export to Excel
                        </h2>
                        <p className="text-sm text-black-400">
                            Download your transactions as a .xlsx file
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Date Range */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-black-200 mb-2">
                            <LuCalendar className="w-4 h-4" />
                            Date Range
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-black-600 mb-1 block">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-50 text-sm outline-none focus:border-almond-cream-400 focus:ring-2 focus:ring-almond-cream-400/20 transition-all cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-black-600 mb-1 block">
                                    To
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-50 text-sm outline-none focus:border-almond-cream-400 focus:ring-2 focus:ring-almond-cream-400/20 transition-all cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-black-200 mb-2">
                            <LuFilter className="w-4 h-4" />
                            Filters
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <select
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                    setCategory("all");
                                }}
                                className="w-full px-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-200 text-sm outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                            >
                                <option value="all">All Types</option>
                                <option value="income">Income Only</option>
                                <option value="expense">Expense Only</option>
                            </select>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-jet-black-900 border border-black-700 rounded-xl text-black-200 text-sm outline-none focus:border-almond-cream-400 transition-colors cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Info text */}
                    <div className="p-3 rounded-xl bg-jet-black-900/50 border border-jet-black-800/50">
                        <p className="text-xs text-black-400">
                            {!startDate && !endDate
                                ? "No date range selected — all transactions will be exported."
                                : `Exporting transactions${startDate ? ` from ${new Date(startDate).toLocaleDateString("en-IN")}` : ""}${endDate ? ` to ${new Date(endDate).toLocaleDateString("en-IN")}` : ""}.`}
                            {type !== "all" && ` Type: ${type}.`}
                            {category !== "all" && ` Category: ${category}.`}
                        </p>
                    </div>

                    {/* Export Button */}
                    <Button onClick={handleExport} loading={loading} fullWidth>
                        <LuDownload className="w-4 h-4" />
                        Download Report
                    </Button>
                </div>
            </div>
        </div>
    );
}
