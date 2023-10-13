import { MongoClient } from "mongodb";

const uri =
    "mongodb+srv://race:RAaE5mRKYmTVL1YX@racebase.67kl508.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function getDatabase() {
    try {
        await client.connect();
        const db = client.db("posts_db");
        return db;
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export { getDatabase };
