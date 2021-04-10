import Head from "next/head";
import { useEffect, useState } from "react";
import Chart from "../components/chart";
import Header from "../components/header";
import { ICurrency } from "../lib/currency";

export default function Index() {
    const [all, setAll] = useState<ICurrency[]>([]);
    const [data, setData] = useState<ICurrency[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        (async () => {
            const data = await (await fetch("/api/data")).json();

            setAll(data);
            setData(data);
        })();
    }, []);

    useEffect(() => {
        if (!filter) return setData(all);

        return setData(data.filter(({ name }) => name === filter));
    }, [filter]);

    return (
        <>
            <Head>
                <title>cryptorank</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 grid place-items-center">
                    <div className="flex items-center py-3" style={{ width: 800 }}>
                        <label className="text-xs text-gray-700 uppercase mr-2">View</label>
                        <select className="text-sm text-gray-900 p-1 border border-gray-100" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="">All</option>
                            {data.map(({ name }) => (
                                <option value={name} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Chart data={data} />
                </div>
                <footer className="h-16 grid place-items-center flex-shrink-0">
                    <p className="text-gray-700">
                        <span className="text-gray-400">by</span>
                        <span> </span>
                        <a href="https://github.com/cursorsdottsx" className="hover:underline">
                            cursorsdottsx
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
