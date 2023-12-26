export default function TextActionRenderer({ text, action, onClickAction }) {
    return (
        <label className="text-[#adafb1] text-sm font-medium flex gap-1 justify-center">
            {text}
            <span className="text-[#008dff] cursor-pointer text-sm font-medium" onClick={onClickAction}>
                {action}
            </span>
        </label>
    )
}