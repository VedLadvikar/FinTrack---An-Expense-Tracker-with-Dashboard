import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";


export default function MonthlyComparison({ data }) {
    if (!data) return null;

    const { currentMonth, previousMonth, incomeChange, expenseChange } = data;

    const items = [
        {
            label: "Income",
            current: currentMonth.income,
            previous: previousMonth.income,
            change: incomeChange,
            positiveIsGood: true,
        },
        {
            label: "Expense",
            current: currentMonth.expense,
            previous: previousMonth.expense,
            change: expenseChange,
            positiveIsGood: false,
        },
    ];

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Monthly Comparison
            </h3>
            <div className="space-y-4">
                {items.map((item) => {
                    const isPositive = item.change >= 0;
                    const isGood = item.positiveIsGood ? isPositive : !isPositive;

                    return (
                        <div key={item.label} className="p-3 rounded-xl bg-jet-black-900/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-black-400">{item.label}</span>
                                <div className={`flex items-center gap-1 text-xs font-medium ${
                                    isGood ? "text-income" : "text-expense"
                                }`}>
                                    {isPositive ? (
                                        <LuTrendingUp className="w-3.5 h-3.5" />
                                    ) : (
                                        <LuTrendingDown className="w-3.5 h-3.5" />
                                    )}
                                    {Math.abs(item.change)}%
                                </div>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-lg font-bold text-black-50">
                                    ₹{item.current.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-black-600">
                                    vs ₹{item.previous.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
