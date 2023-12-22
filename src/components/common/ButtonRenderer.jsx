export default function ButtonRenderer({ className, text, imgSrc, onClickAction, ...additionalProps }) {
    return (
        <button className={`bg-[#2D3B48] text-white flex justify-center items-center gap-2 rounded-xl px-2 py-1 hover:scale-105 transition ease-in-out delay-75 ${className}`}
            onClick={onClickAction}
            {...additionalProps}
        >
            {imgSrc && <img className="w-5 h-5" src={imgSrc} alt={text} />}
            {text}
        </button>
    )
}