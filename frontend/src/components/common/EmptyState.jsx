import { LuInbox } from "react-icons/lu";
import Button from "./Button";


export default function EmptyState({
    icon: Icon = LuInbox,
    title = "No data yet",
    message = "Get started by adding your first item.",
    actionLabel,
    onAction,
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-[#faf9f7] border border-[#ece7e2] flex items-center justify-center mb-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                <Icon className="w-10 h-10 text-[#0b516a]/30" />
            </div>
            <h3 className="text-lg font-semibold text-[#1f1f1f] mb-1">
                {title}
            </h3>
            <p className="text-sm text-[#7c7c7c] max-w-sm mb-6">{message}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
}
