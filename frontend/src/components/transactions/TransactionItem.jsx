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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 glass-card hover-card group animate-fade-in">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-jet-black-900 border border-jet-black-800 shadow-sm">
                    <Icon className={`w-4 h-4 ${isIncome ? "text-income" : "text-expense"}`} />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-black-200 truncate">
                        {description}
                    </p>
                    <p className="text-xs text-black-600 truncate">
                        {category} · {formattedDate}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-jet-black-900 sm:border-0">
                <div className="flex items-center gap-1 shrink-0">
                    <span className={`text-sm font-bold ${isIncome ? "text-income" : "text-expense"}`}>
                        {isIncome ? "+" : "-"}₹{amount.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 rounded-lg hover:bg-jet-black-800 text-black-400 hover:text-almond-cream-400 transition-colors cursor-pointer"
                        title="Edit"
                    >
                        <LuPencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(transaction)}
                        className="p-2 rounded-lg hover:bg-stone-brown-500/10 text-black-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete"
                    >
                        <LuTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
