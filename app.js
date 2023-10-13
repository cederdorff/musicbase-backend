// ========== IMPORTS ========== //
import cors from "cors";
import express from "express";
import { getDatabase } from "./db-connect.js";

// ========== APP SETUP ========== //
const app = express();
const port = process.env.SERVER_PORT || 3333;
app.use(express.json()); // to parse JSON bodies
app.use(cors());

// GET Endpoint "/"
app.get("/", (request, response) => {
    response.send("Node Express Musicbase REST API");
});

app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);

    const db = await getDatabase();
    const postsCollection = db.collection("posts");
    const posts = await postsCollection.find().toArray();

    console.log(posts);
});
