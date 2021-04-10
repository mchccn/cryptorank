import Head from "next/head";
import { useEffect, useState } from "react";
import Chart from "../components/chart";
import Header from "../components/header";
import { IPureCurrency } from "../lib/currency";

export default function Index() {
    const [all, setAll] = useState<IPureCurrency[]>([]);
    const [data, setData] = useState<IPureCurrency[]>([]);
    const [colored, setColored] = useState<(IPureCurrency & { color: string })[]>([]);
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

    useEffect(() => {
        setColored(data.map((currency) => ({ ...currency, color: Math.floor(Math.random() * 16777215).toString(16) })));
    }, [data]);

    return (
        <>
            <Head>
                <title>cryptorank</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 grid place-items-center">
                    <div className="flex flex-col" style={{ width: 800 }}>
                        <div className="flex items-center py-3">
                            <label className="text-xs text-gray-700 uppercase mr-2">View</label>
                            <select className="text-sm text-gray-900 p-1 border border-gray-100" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="">All</option>
                                {all.map(({ name }) => (
                                    <option value={name} key={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-10">
                            {colored.map(({ name, color }) => (
                                <div>
                                    <p>{name}</p>
                                    <div className="h-4 w-4" style={{ backgroundColor: `#${color}` }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Chart data={colored} />
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
