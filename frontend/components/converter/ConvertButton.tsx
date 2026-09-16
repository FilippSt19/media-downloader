type ConvertButtonProps = {
    disabled: boolean;
    loading: boolean;
    onClick: () => void;
};

export default function ConvertButton({
    disabled,
    loading,
    onClick,
}: ConvertButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled || loading}
            onClick={onClick}
            className="
                mt-8
                flex h-14 w-full items-center justify-center
                rounded-xl
                bg-white
                text-black
                font-semibold
                transition
                hover:bg-zinc-200
                disabled:cursor-not-allowed
                disabled:bg-zinc-700
                disabled:text-zinc-400
            "
        >
            {loading
                ? "Converting..."
                : "Convert"}
        </button>
    );
}