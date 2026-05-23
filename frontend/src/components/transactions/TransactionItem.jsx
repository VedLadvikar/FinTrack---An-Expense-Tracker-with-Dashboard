import {
    LuArrowUpRight,
    LuArrowDownRight,
    LuPencil,
    LuTrash2,
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

export default function TransactionItem({ transaction, onEdit, onDelete }) {
    const { type, category, description, amount, date } = transaction;
    const isIncome = type === "income";
    const Icon = categoryIcons[category] || LuEllipsis;

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#faf9f7] border border-[#ece7e2] rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-150 group">
            <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isIncome ? "bg-emerald-50" : "bg-[#f4c7a8]/30"
                }`}>
                    <Icon size={15} className={isIncome ? "text-emerald-600" : "text-[#c97a45]"} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1f1f1f] truncate">{description}</p>
                    <p className="text-xs text-[#7c7c7c] truncate">{category} · {formattedDate}</p>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-[#ece7e2] sm:border-0">
                <div className="flex items-center gap-1 flex-shrink-0">
                    {isIncome
                        ? <LuArrowUpRight size={14} className="text-emerald-600" />
                        : <LuArrowDownRight size={14} className="text-[#c97a45]" />
                    }
                    <span className={`text-sm font-bold tabular-nums ${
                        isIncome ? "text-emerald-600" : "text-[#1f1f1f]"
                    }`}>
                        {isIncome ? "+" : "-"}₹{amount.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 rounded-lg hover:bg-[#ece7e2] text-[#7c7c7c] hover:text-[#0b516a] transition-colors cursor-pointer"
                        title="Edit"
                    >
                        <LuPencil size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(transaction)}
                        className="p-2 rounded-lg hover:bg-red-50 text-[#7c7c7c] hover:text-red-500 transition-colors cursor-pointer"
                        title="Delete"
                    >
                        <LuTrash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
