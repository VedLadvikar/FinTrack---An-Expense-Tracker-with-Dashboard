import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#8c7a66", "#bb9b77", "#71665b", "#ad9b85",
    "#6b8c73", "#d2ccc6", "#aa8155", "#bb9a77",
];


export default function CategoryPieChart({ data = [] }) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            return (
                <div className="glass-card p-3 text-xs">
                    <p className="text-black-200 font-medium">{item.name}</p>
                    <p className="text-black-400">
                        ₹{item.value.toLocaleString("en-IN")} ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (percent < 0.05) return null;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Expense by Category
            </h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={95}
                            paddingAngle={3}
                            dataKey="value"
                            labelLine={false}
                            label={renderCustomLabel}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ fontSize: "11px", color: "#a4998e" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-56 flex items-center justify-center text-sm text-black-600">
                    No expenses recorded yet
                </div>
            )}
        </div>
    );
}
