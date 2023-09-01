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
    const query = request.query.q.toLocaleLowerCase();
    const artists = await readArtists();
    const results = artists.filter(artist => artist.name.toLowerCase().includes(query));
    response.json(results);
});

// GET ROUTE "/artists/:id" - get one artist
app.get("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const artists = await readArtists();
    const result = artists.find(artist => artist.id === id);
    response.json(result);
});

// POST ROUTE "/artists" - CREATE NEW ARTIST
app.post("/artists", async (request, response) => {
    const newArtist = {
        id: new Date().getTime(),
        ...request.body
    };
    const artists = await readArtists();
    artists.push(newArtist);
    console.log(artists);
    wrireArtists(artists);
    response.json(artists);
});

// PUT ROUTE "/artists/:id" - UPDATE ARTIST
app.put("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const artist = request.body;
    const artists = await readArtists();
    const result = artists.find(artist => artist.id === id);
    result.name = artist.name;
    result.birthdate = artist.birthdate;
    result.activeSince = artist.activeSince;
    result.genres = artist.genres;
    result.labels = artist.labels;
    result.website = artist.website;
    result.image = artist.image;
    result.shortDescription = artist.shortDescription;

    wrireArtists(artists);
    response.json(artists);
});

// DELETE ROUTE "/artists/:id" - DELETE one artist
app.delete("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const artists = await readArtists();
    const results = artists.filter(artist => artist.id != id);
    wrireArtists(results);
    response.json(results);
});

// ========== HELPER FUNCTIONS ========== //

async function readArtists() {
    const json = await fs.readFile("./data/artists.json");
    return JSON.parse(json);
}

async function wrireArtists(artists) {
    const json = JSON.stringify(artists);
    await fs.writeFile("./data/artists.json", json);
}
