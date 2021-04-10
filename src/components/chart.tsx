import { useEffect, useRef } from "react";
import { IPureCurrency } from "../lib/currency";

export default function Chart({ data }: { data: (IPureCurrency & { color: string })[] }) {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        canvas.current.width = 1200;
        canvas.current.height = 600;

        const ctx = canvas.current.getContext("2d");

        data.forEach(({ name, rankings, color }) => {});
    }, []);

    return <canvas ref={canvas} className="border border-gray-00 shadow-sm rounded-sm" style={{ width: 800, height: 400 }}></canvas>;
}
