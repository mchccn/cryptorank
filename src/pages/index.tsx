import Head from "next/head";
import Header from "../components/header";

export default function Index() {
    return (
        <>
            <Head>
                <title>cryptorank</title>
            </Head>
            <div>
                <Header />
            </div>
        </>
    );
}
