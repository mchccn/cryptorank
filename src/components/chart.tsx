import { useEffect, useRef } from "react";
import { IPureCurrency } from "../lib/currency";

export default function Chart({ data }: { data: (IPureCurrency & { color: string })[] }) {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        canvas.current.width = 1300;
        canvas.current.height = 700;

        const chartWidth = 1200;
        const chartHeight = 600;

        const ctx = canvas.current.getContext("2d");

        ctx.font = "12px Arial";

        for (let n = 0, i = 0; n <= chartHeight; n += chartHeight / 10, i++) {
            ctx.fillText((i * 10).toString(), 10, (n + 12) * 0.985);
        }

        const timestamps = data.reduce((acc, cur) => acc.concat(cur.rankings.map(({ date }) => new Date(date).getTime())), []);

        const earliest = Math.min(...timestamps);
        const latest = Math.max(...timestamps);

        data.forEach(({ rankings, color }) => {
            ctx.beginPath();

            ctx.strokeStyle = ctx.fillStyle = `#${color}`;

            rankings.forEach(({ date, ranking }, i) => {
                const x = ((new Date(date).getTime() - earliest) * chartWidth) / (latest - earliest) + 100;
                const y = ((ranking - 0) * chartHeight) / 100;

                if (!i) return ctx.moveTo(x, y);

                return ctx.lineTo(x, y);
            });

            return ctx.stroke();
        });
    });

    return <canvas ref={canvas} className="border border-gray-00 shadow-sm rounded-sm" style={{ width: 800, height: 400 }}></canvas>;
}
