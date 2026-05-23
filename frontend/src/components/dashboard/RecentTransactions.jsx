import { Link } from "react-router-dom";
import {
    LuArrowUpRight,
    LuArrowDownRight,
    LuShoppingBag,
    LuUtensils,
    LuCar,
    LuReceipt,
    LuGamepad2,
    LuHeart,
    LuGraduationCap,
    LuBriefcase,
    LuTrendingUp,
    LuWallet,
    LuCircleDollarSign,
    LuEllipsis,
} from "react-icons/lu";

const categoryIcons = {
    Food: LuUtensils,
    Transport: LuCar,
    Shopping: LuShoppingBag,
    Bills: LuReceipt,
    Entertainment: LuGamepad2,
    Health: LuHeart,
    Education: LuGraduationCap,
    Salary: LuBriefcase,
    Freelance: LuCircleDollarSign,
    Investment: LuTrendingUp,
    Business: LuWallet,
    Other: LuEllipsis,
};

export default function RecentTransactions({ transactions = [] }) {
    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-IN", { month: "short", day: "numeric" });

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[#1f1f1f] font-semibold text-[15px]">Recent Transactions</p>
                    <p className="text-[#7c7c7c] text-xs mt-0.5">
                        {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                    </p>
                </div>
                <Link
                    to="/transactions"
                    className="text-[#0b516a] text-xs font-medium hover:underline transition-all"
                >
                    View all
                </Link>
            </div>

            {transactions.length > 0 ? (
                <div className="space-y-0.5">
                    {transactions.map((t) => {
                        const Icon = categoryIcons[t.category] || LuEllipsis;
                        const isIncome = t.type === "income";
                        return (
                            <div
                                key={t._id}
                                className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-[#ece7e2]/40 transition-colors duration-150"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    isIncome ? "bg-emerald-50" : "bg-[#f4c7a8]/30"
                                }`}>
                                    <Icon size={14} className={isIncome ? "text-emerald-600" : "text-[#c97a45]"} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#1f1f1f] text-sm font-medium truncate">
                                        {t.description}
                                    </p>
                                    <p className="text-[#7c7c7c] text-[11px]">
                                        {t.category} · {formatDate(t.date)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    {isIncome
                                        ? <LuArrowUpRight size={13} className="text-emerald-600" />
                                        : <LuArrowDownRight size={13} className="text-[#c97a45]" />
                                    }
                                    <p className={`text-sm font-semibold tabular-nums ${
                                        isIncome ? "text-emerald-600" : "text-[#1f1f1f]"
                                    }`}>
                                        {isIncome ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-8 text-center text-sm text-[#7c7c7c]">
                    No recent transactions
                </div>
            )}
        </div>
    );
}
