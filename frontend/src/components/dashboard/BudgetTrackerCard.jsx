

const COLORS = ["#68d7d1", "#efaa75", "#5bc9c4", "#a8d8b0", "#f4c7a8", "#3ab5b0"];

export default function BudgetTrackerCard({ data, totalExpense }) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                <p className="text-[#1f1f1f] font-semibold text-[15px] mb-1">Expense Breakdown</p>
                <p className="text-[#7c7c7c] text-sm py-4 text-center">No data available</p>
            </div>
        );
    }


    const sorted = [...data]
        .sort((a, b) => (b.amount ?? b.total ?? 0) - (a.amount ?? a.total ?? 0))
        .slice(0, 6);

    const maxAmount = sorted[0]?.amount ?? sorted[0]?.total ?? 1;

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[#1f1f1f] font-semibold text-[15px]">Expense Breakdown</p>
                    <p className="text-[#7c7c7c] text-xs mt-0.5">By category</p>
                </div>
                {totalExpense != null && (
                    <span className="text-xs text-[#7c7c7c] bg-[#ece7e2] px-2 py-0.5 rounded-full">
                        ₹{totalExpense.toLocaleString("en-IN")}
                    </span>
                )}
            </div>

            <div className="space-y-4">
                {sorted.map((item, i) => {
                    const label = item.name ?? item.category ?? item._id ?? "Other";
                    const amount = item.amount ?? item.total ?? 0;
                    const pct = Math.round((amount / maxAmount) * 100);
                    const color = COLORS[i % COLORS.length];

                    return (
                        <div key={label}>
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[#1f1f1f] text-sm">{label}</p>
                                <div className="flex items-center gap-1.5">
                                    <p className="text-[#7c7c7c] text-xs">
                                        ₹{amount.toLocaleString("en-IN")}
                                    </p>
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#ece7e2] text-[#7c7c7c]">
                                        {pct}%
                                    </span>
                                </div>
                            </div>
                            <div className="h-1.5 bg-[#ece7e2] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%`, backgroundColor: color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
