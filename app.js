// ========== IMPORTS ========== //
import express from "express";
import cors from "cors";
import fs from "fs/promises";

// ========== APP SETUP ========== //
const app = express();
const port = process.env.SERVER_PORT || 3333;
app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// ========== REST ROUTES ========== //

// GET ROUTE "/"
app.get("/", (request, response) => {
    response.send("Node Express Musicbase REST API");
});

// GET ROUTE "/artists" - get all artists
app.get("/artists", async (request, response) => {
    const artists = await readArtists();
    response.json(artists);
});

// GET ROUTE "/artists/search?q=taylor" - get all artists
app.get("/artists/search", async (request, response) => {
    const artists = await readArtists();
    const results = artists.filter(artist => artist.name.toLowerCase().includes());
});

// GET ROUTE "/artists/:id" - get one artist
app.get("/artists/:id", (request, response) => {});

// GET ROUTE "/artists/:id" - get one artist
app.get("/artists/:id/albums", (request, response) => {});

// ========== HELPER FUNCTIONS ========== //

async function readArtists() {
    const json = await fs.readFile("./data/artists.json");
    return JSON.parse(json);
}
