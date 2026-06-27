import { setServers } from "node:dns";
setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db();

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    }
});