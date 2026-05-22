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
            <div className="w-20 h-20 rounded-2xl bg-jet-black-900 flex items-center justify-center mb-5">
                <Icon className="w-10 h-10 text-black-600" />
            </div>
            <h3 className="text-lg font-semibold text-black-200 mb-2">
                {title}
            </h3>
            <p className="text-sm text-black-400 max-w-sm mb-6">{message}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
}
