import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import connect from "../../lib/connect";
import currencies from "../../lib/currency";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const date = new Date();

        date.setDate(date.getDate() - 1);

        if (req.query.date) {
            const query = new Date(req.query.date as string);

            if (query.getTime() <= date.getTime()) {
                date.setDate(query.getDate() - 1);
            }
        }

        const json: {
            status: {};
            data: { id: number; name: string; symbol: string; cmc_rank: number; last_updated: string }[];
        } = await (
            await fetch(
                `https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/historical?convert=USD,BTC&date=${
                    date.toISOString().split("T")[0]
                }&limit=100&start=1`
            )
        ).json();

        if (!json.data) return res.status(400).end();

        await Promise.all(
            json.data.map(async ({ id, name, symbol, cmc_rank }) => {
                const currency = await currencies.findOne({
                    _id: id,
                });

                if (!currency) {
                    return currencies.create({
                        _id: id,
                        name,
                        ticker: symbol,
                        rankings: [{ date: date.toISOString(), ranking: cmc_rank }],
                    });
                }

                if (currency.rankings.find((r) => r.date.split("T")[0] === date.toISOString().split("T")[0])) return;

                currency.rankings.push({ date: date.toISOString(), ranking: cmc_rank });

                currency.markModified("rankings");

                return currency.save();
            })
        );

        return res.status(200).end();
    } catch (e) {
        console.log(e);

        return res.status(500).end();
    }
};

export default connect(handler);
