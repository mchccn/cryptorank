import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/connect";
import currencies from "../../lib/currency";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = (await currencies.find()).slice(0, 100);

        return res.json(data);
    } catch (e) {
        console.log(e);

        return res.status(500).end();
    }
};

export default connect(handler);
