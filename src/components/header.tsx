import { useState } from "react";

export default function Header() {
    const [dark, setDark] = useState(typeof window !== "undefined" ? (window.localStorage.getItem("vade-site-theme") || "light") === "dark" : false);

    return (
        <header className="flex justify-between items-center p-4">
            <h2 className="font-light text-2xl text-yellow-500">cryptorank</h2>
        </header>
    );
}
