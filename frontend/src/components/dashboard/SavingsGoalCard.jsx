

const COLORS = ["#68d7d1", "#efaa75", "#a8d8b0", "#f4c7a8"];

function DonutSegment({ pct, color, size = 56, stroke = 6 }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (Math.min(pct, 100) / 100) * circ;
    return (
        <svg width={size} height={size} className="flex-shrink-0">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ece7e2" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <text
                x={size / 2} y={size / 2 + 4}
                textAnchor="middle"
                style={{ fill: "#1f1f1f", fontSize: 11, fontWeight: 600 }}
            >
                {pct}%
            </text>
        </svg>
    );
}

export default function SavingsGoalCard({ data, monthlySavingsPercentage }) {

    let goals = [];

    if (Array.isArray(data) && data.length > 0) {
        goals = data.slice(0, 4).map((d, i) => ({
            label: d.month ?? `Month ${i + 1}`,
            pct: Math.min(Math.round(((d.savings ?? 0) / (d.income || 1)) * 100), 100),
            sub: `₹${(d.savings ?? 0).toLocaleString("en-IN")} saved`,
            color: COLORS[i % COLORS.length],
        }));
    } else if (monthlySavingsPercentage != null) {

        goals = [
            {
                label: "Savings Rate",
                pct: Math.min(Math.round(monthlySavingsPercentage), 100),
                sub: `${monthlySavingsPercentage}% of income saved`,
                color: "#68d7d1",
            },
        ];
    }

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
            <div className="mb-4">
                <p className="text-[#1f1f1f] font-semibold text-[15px]">Savings Overview</p>
                <p className="text-[#7c7c7c] text-xs mt-0.5">Progress towards targets</p>
            </div>

            {goals.length === 0 ? (
                <p className="text-[#7c7c7c] text-sm py-4 text-center">No savings data</p>
            ) : (
                <div className="space-y-4">
                    {goals.map((g) => (
                        <div key={g.label} className="flex items-center gap-3">
                            <DonutSegment pct={g.pct} color={g.color} />
                            <div className="min-w-0 flex-1">
                                <p className="text-[#1f1f1f] text-sm font-medium">{g.label}</p>
                                <p className="text-[#7c7c7c] text-[11px] mt-0.5">{g.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
