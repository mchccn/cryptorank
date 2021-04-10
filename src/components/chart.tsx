import { useEffect, useRef, useState } from "react";
import { ICurrency } from "../lib/currency";

export default function Chart({ data }: { data: ICurrency[] }) {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(undefined);

    useEffect(() => {
        if (canvas.current) setCtx(canvas.current.getContext("2d"));
    }, []);

    useEffect(() => {
        if (ctx) {
            console.log(data);
        }
    }, [ctx]);

    return <canvas className="border border-gray-00 shadow-sm rounded-sm" style={{ width: 800, height: 400 }}></canvas>;
}
