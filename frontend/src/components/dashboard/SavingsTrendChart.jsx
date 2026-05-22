import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


export default function SavingsTrendChart({ data = [] }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const val = payload[0].value;
            return (
                <div className="glass-card p-3 text-xs">
                    <p className="text-black-200 font-medium">{label}</p>
                    <p className={val >= 0 ? "text-income" : "text-expense"}>
                        {val >= 0 ? "Saved" : "Deficit"}: ₹{Math.abs(val).toLocaleString("en-IN")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Savings Trend
            </h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="savingsLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#6b8c73" />
                                <stop offset="100%" stopColor="#ad9b85" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#554d44" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="savings"
                            stroke="url(#savingsLine)"
                            strokeWidth={3}
                            dot={{ fill: "#6b8c73", r: 4, strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: "#6b8c73", stroke: "#0f172a", strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-56 flex items-center justify-center text-sm text-black-600">
                    No savings data yet
                </div>
            )}
        </div>
    );
}
