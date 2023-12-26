import { Button } from "@nextui-org/react";

export default function ButtonRenderer({ className, loading = false, text, imgSrc, onClickAction, ...additionalProps }) {
    return (
        <Button className={`bg-[#2D3B48] text-white min-h-7 flex justify-center items-center gap-2 rounded-xl px-2 py-1 hover:scale-105 transition ease-in-out delay-75 ${className}`}
            onClick={onClickAction}
            color="primary"
            endContent={imgSrc && <img className="w-5 h-5" src={imgSrc} alt={text} />}
            {...additionalProps}
            isLoading={loading}
        >
            {text}
        </Button>
    )
}