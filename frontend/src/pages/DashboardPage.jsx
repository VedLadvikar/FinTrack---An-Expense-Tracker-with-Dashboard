import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import dashboardService from "../services/dashboardService";
import StatCard from "../components/dashboard/StatCard";
import TrendChartCard from "../components/dashboard/TrendChartCard";
import CategorySpendingChart from "../components/dashboard/CategorySpendingChart";
import SavingsGoalCard from "../components/dashboard/SavingsGoalCard";
import BudgetTrackerCard from "../components/dashboard/BudgetTrackerCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { SkeletonCard, SkeletonChart } from "../components/common/Skeleton";
import { LuWallet, LuTrendingUp, LuTrendingDown, LuPiggyBank, LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function DashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await dashboardService.getDashboard();
                if (response.success) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    if (loading) {
        return (
            <div>
                {/* Header skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="h-4 w-36 skeleton mb-1.5" />
                        <div className="h-7 w-48 skeleton" />
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
                    <div className="xl:col-span-2"><SkeletonChart /></div>
                    <SkeletonChart />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonChart key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div style={{ animation: "fade-in 0.35s ease-out" }}>

            <header className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[#7c7c7c] text-sm mb-0.5">
                        {greeting()}, {user?.name?.split(" ")[0] || "there"}
                    </p>
                    <h1 className="text-[#1f1f1f] text-2xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                </div>
                <Link
                    to="/transactions"
                    className="flex items-center gap-1.5 bg-[#0b516a] text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[#084b63] transition-all duration-150 active:scale-95"
                >
                    <LuPlus size={14} strokeWidth={2.5} />
                    <span className="hidden sm:inline">Add Transaction</span>
                </Link>
            </header>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={LuWallet}
                    label="Total Balance"
                    value={data?.balance ?? 0}
                    color="primary"
                    trendLabel="all time"
                />
                <StatCard
                    icon={LuTrendingUp}
                    label="Monthly Income"
                    value={data?.totalIncome ?? 0}
                    trend={data?.monthlyComparison?.incomeChange}
                    color="income"
                />
                <StatCard
                    icon={LuTrendingDown}
                    label="Monthly Expenses"
                    value={data?.totalExpense ?? 0}
                    trend={data?.monthlyComparison?.expenseChange}
                    color="expense"
                />
                <StatCard
                    icon={LuPiggyBank}
                    label="Savings Rate"
                    value={`${data?.monthlySavingsPercentage ?? 0}%`}
                    color="info"
                    trendLabel="this month"
                />
            </div>


            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
                <div className="xl:col-span-2">
                    <TrendChartCard data={data?.monthlyChart} />
                </div>
                <div>
                    <CategorySpendingChart data={data?.categoryData} />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Recent Transactions — spans 2 cols on xl */}
                <div className="lg:col-span-2 xl:col-span-2">
                    <RecentTransactions transactions={data?.recentTransactions} />
                </div>

                {/* Savings Goal */}
                <div>
                    <SavingsGoalCard
                        data={data?.savingsTrend}
                        monthlySavingsPercentage={data?.monthlySavingsPercentage}
                    />
                </div>

                {/* Budget Tracker — full width on lg, 2-col on xl */}
                <div className="lg:col-span-2">
                    <BudgetTrackerCard
                        data={data?.categoryData}
                        totalExpense={data?.totalExpense}
                    />
                </div>

                {/* Highest expense category */}
                {data?.highestExpenseCategory && (
                    <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                        <p className="text-[#1f1f1f] font-semibold text-[15px] mb-1">Top Expense</p>
                        <p className="text-[#7c7c7c] text-xs mb-4">Highest spending category</p>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#f4c7a8]/15 border border-[#f4c7a8]/30">
                            <span className="text-[#1f1f1f] text-sm font-medium">
                                {data.highestExpenseCategory.name}
                            </span>
                            <span className="text-sm font-bold text-[#c97a45]">
                                ₹{data.highestExpenseCategory.amount?.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
