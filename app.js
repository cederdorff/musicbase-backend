// ========== IMPORTS ========== //
import cors from "cors";
import express from "express";
import albumsRouter from "./routes/albums.js";
import artistsRouter from "./routes/artists.js";
import songsRouter from "./routes/songs.js";

// ========== APP SETUP ========== //
const app = express();
const port = process.env.SERVER_PORT || 3333;
app.use(express.json()); // to parse JSON bodies
app.use(cors());
// Routers
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/songs", songsRouter);

// GET Endpoint "/"
app.get("/", (request, response) => {
    response.send("Node Express Musicbase REST API");
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
