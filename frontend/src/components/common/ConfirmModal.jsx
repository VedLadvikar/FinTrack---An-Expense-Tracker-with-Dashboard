import { LuTriangleAlert } from "react-icons/lu";
import Button from "./Button";
import Modal from "./Modal";


export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    loading = false,
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center gap-4 py-2">
                <div className="w-14 h-14 rounded-full bg-stone-brown-500/10 flex items-center justify-center">
                    <LuTriangleAlert className="w-7 h-7 text-red-400" />
                </div>
                <p className="text-black-200 text-sm">{message}</p>
                <div className="flex gap-3 w-full mt-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        fullWidth
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        fullWidth
                        loading={loading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
