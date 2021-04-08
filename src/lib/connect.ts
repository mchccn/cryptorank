import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const connect = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    });

    return handler(req, res);
};

export default connect;
