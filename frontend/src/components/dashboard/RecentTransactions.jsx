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
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Recent Transactions
            </h3>
            {transactions.length > 0 ? (
                <div className="space-y-3">
                    {transactions.map((t) => {
                        const Icon = categoryIcons[t.category] || LuEllipsis;
                        const isIncome = t.type === "income";
                        return (
                            <div
                                key={t._id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-jet-black-900/50 hover:bg-jet-black-900 transition-colors"
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    isIncome ? "bg-income/10" : "bg-expense/10"
                                }`}>
                                    <Icon className={`w-4 h-4 ${isIncome ? "text-income" : "text-expense"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-black-200 truncate">
                                        {t.description}
                                    </p>
                                    <p className="text-xs text-black-600">
                                        {t.category} · {formatDate(t.date)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    {isIncome ? (
                                        <LuArrowUpRight className="w-3.5 h-3.5 text-income" />
                                    ) : (
                                        <LuArrowDownRight className="w-3.5 h-3.5 text-expense" />
                                    )}
                                    <span className={`text-sm font-semibold ${
                                        isIncome ? "text-income" : "text-expense"
                                    }`}>
                                        {isIncome ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-8 text-center text-sm text-black-600">
                    No transactions yet
                </div>
            )}
        </div>
    );
}
