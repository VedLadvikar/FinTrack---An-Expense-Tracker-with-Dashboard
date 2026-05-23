import { useState } from "react";
import reportService from "../services/reportService";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { LuDownload, LuFileSpreadsheet, LuCalendar, LuFilter, LuFileText } from "react-icons/lu";

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

    const SELECT_CLS = "w-full px-3 py-2.5 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] focus:shadow-[0_0_0_3px_rgba(11,81,106,0.1)] transition-all cursor-pointer";
    const INPUT_CLS  = "w-full px-3 py-2.5 bg-[#faf9f7] border border-[#ece7e2] rounded-lg text-sm text-[#1f1f1f] outline-none focus:border-[#0b516a] focus:shadow-[0_0_0_3px_rgba(11,81,106,0.1)] transition-all cursor-pointer";

    return (
        <div className="space-y-6" style={{ animation: "fade-in 0.35s ease-out" }}>
            {/* Header */}
            <div>
                <h1 className="text-[#1f1f1f] text-2xl font-bold tracking-tight mb-0.5">Reports</h1>
                <p className="text-[#7c7c7c] text-sm">Export your financial records to Excel</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Export card */}
                <div className="lg:col-span-2 bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-[#0b516a]/10 flex items-center justify-center">
                            <LuFileSpreadsheet size={20} className="text-[#0b516a]" />
                        </div>
                        <div>
                            <h2 className="text-[#1f1f1f] text-base font-semibold">Export to Excel</h2>
                            <p className="text-[#7c7c7c] text-xs">Download your transactions as a .xlsx file</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Date range */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-[#1f1f1f] mb-2">
                                <LuCalendar size={14} />
                                Date Range
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-[#7c7c7c] mb-1 block">From</label>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={INPUT_CLS} />
                                </div>
                                <div>
                                    <label className="text-xs text-[#7c7c7c] mb-1 block">To</label>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={INPUT_CLS} />
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-[#1f1f1f] mb-2">
                                <LuFilter size={14} />
                                Filters
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <select value={type} onChange={(e) => { setType(e.target.value); setCategory("all"); }} className={SELECT_CLS}>
                                    <option value="all">All Types</option>
                                    <option value="income">Income Only</option>
                                    <option value="expense">Expense Only</option>
                                </select>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={SELECT_CLS}>
                                    <option value="all">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Info text */}
                        <div className="p-3 rounded-lg bg-[#0b516a]/5 border border-[#0b516a]/10">
                            <p className="text-xs text-[#7c7c7c]">
                                {!startDate && !endDate
                                    ? "No date range selected — all transactions will be exported."
                                    : `Exporting transactions${startDate ? ` from ${new Date(startDate).toLocaleDateString("en-IN")}` : ""}${endDate ? ` to ${new Date(endDate).toLocaleDateString("en-IN")}` : ""}.`}
                                {type !== "all" && ` Type: ${type}.`}
                                {category !== "all" && ` Category: ${category}.`}
                            </p>
                        </div>

                        <Button onClick={handleExport} loading={loading} fullWidth>
                            <LuDownload size={15} />
                            Download Report
                        </Button>
                    </div>
                </div>

                {/* Info cards */}
                <div className="space-y-4">
                    {[
                        {
                            icon: LuFileText,
                            title: "Excel Format",
                            desc: "Reports are exported as .xlsx files, compatible with Microsoft Excel and Google Sheets.",
                        },
                        {
                            icon: LuFilter,
                            title: "Custom Filters",
                            desc: "Filter by date range, transaction type, or category before exporting.",
                        },
                        {
                            icon: LuCalendar,
                            title: "All Time Data",
                            desc: "Leave dates empty to export your complete transaction history.",
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0b516a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icon size={15} className="text-[#0b516a]" />
                                </div>
                                <div>
                                    <p className="text-[#1f1f1f] text-sm font-medium mb-0.5">{title}</p>
                                    <p className="text-[#7c7c7c] text-xs leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
