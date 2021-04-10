import Head from "next/head";
import { useEffect, useState } from "react";
import Chart from "../components/chart";
import Header from "../components/header";
import { IPureCurrency } from "../lib/currency";

export default function Index() {
    const [all, setAll] = useState<IPureCurrency[]>([]);
    const [data, setData] = useState<IPureCurrency[]>([]);
    const [colored, setColored] = useState<(IPureCurrency & { color: string })[]>([]);
    const [allColored, setAllColored] = useState<(IPureCurrency & { color: string })[]>([]);
    const [more, setMore] = useState(false);
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

        return setData(all.filter(({ name }) => name === filter));
    }, [filter]);

    useEffect(() => {
        setColored(
            data.map((currency) => ({
                ...currency,
                color: Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0"),
            }))
        );
    }, [data]);

    useEffect(() => {
        setAllColored(
            all.map((currency) => ({
                ...currency,
                color: Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0"),
            }))
        );
    }, [all]);

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
                        <div className="grid grid-cols-5 gap-x-4">
                            {allColored
                                .map(({ name, color }) => (
                                    <div className="flex items-center justify-between" key={color}>
                                        <p className="text-xs text-gray-700 overflow-hidden overflow-ellipsis whitespace-pre">{name}</p>
                                        <div className="h-4 w-4" style={{ backgroundColor: `#${color}` }}></div>
                                    </div>
                                ))
                                .slice(0, more ? allColored.length : 10)}
                        </div>
                        <div className="mb-4">
                            <a className="text-xs text-gray-400 cursor-pointer" onClick={() => setMore(!more)}>
                                {more ? "Show less" : "Show more"}...
                            </a>
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
