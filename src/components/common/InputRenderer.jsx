
export default function InputRenderer({ className, error, helperText, value, onClickShowPassword, ...props }) {
    return (
        <div className="flex flex-col w-full">
            <input
                value={value || ''}
                className={"border outline-slate-500 border-[#2D3B48] rounded-md bg-transparent px-2 py-1 " + className}
                {...props}
            />
            <div className="flex justify-end">
                {(props.name === "password" || props.name === "confirmPassword") && <button type="button" onClick={onClickShowPassword} className="text-[#2D3B48] text-sm font-medium">{props.type === "password" ? "Show" : "Hide"}</button>}
            </div>
            {helperText && error && <label className={`text-red-500 text-sm text-left ml-1 mt-1`}>{helperText}</label>}
        </div>
    )
}