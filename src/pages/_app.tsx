import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <script
                key="cryptorank-theme"
                dangerouslySetInnerHTML={{
                    __html: `\
		                const stored = window.localStorage.getItem("cryptorank-theme") || "light";
                            
                        if (stored)
                            document.querySelector("html")?.classList.add(stored);
                        else
            	            window.localStorage.setItem("cryptorank-theme", "light");`,
                }}
            ></script>
            <Component {...pageProps} />
        </>
    );
}
