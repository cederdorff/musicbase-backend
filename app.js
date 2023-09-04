// ========== IMPORTS ========== //
import express from "express";
import cors from "cors";
import fs from "fs/promises";

// ========== APP SETUP ========== //
const app = express();
const port = 3333;
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

// ---------- "/artists" ----------//

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

    if (!result) {
        response.status(404).json({ error: "Artist not found!" });
    } else {
        response.json(result);
    }
});

// POST ROUTE "/artists" - CREATE NEW ARTIST
app.post("/artists", async (request, response) => {
    const newArtist = {
        id: new Date().getTime(),
        ...request.body
    };
    const artists = await readArtists();

    const exists = artists.find(artist => artist.name.toLocaleLowerCase() === newArtist.name.toLocaleLowerCase());

    if (exists) {
        response.status(400).json({ error: "Artist already exists!" });
    } else {
        artists.push(newArtist);
        console.log(artists);
        writeArtists(artists);
        response.json(artists);
    }
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

    writeArtists(artists);
    response.json(artists);
});

// DELETE ROUTE "/artists/:id" - DELETE one artist
app.delete("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const artists = await readArtists();
    const results = artists.filter(artist => artist.id != id);
    writeArtists(results);
    response.json(results);
});

// ---------- "/favorites" ----------//
// GET ROUTE "/favorites" - get all favorites
app.get("/favorites", async (request, response) => {
    const favoriteIds = await readFavorites();

    const artists = await readArtists();
    const favorites = artists.filter(artist => favoriteIds.includes(artist.id));

    response.json(favorites);
});

// POST ROUTE "/favorites" - add favorite, expected format for request body: {id: 3}
app.post("/favorites", async (request, response) => {
    const favId = request.body.id; // {id: favId}
    const favoriteIds = await readFavorites();
    favoriteIds.push(favId);
    writeFavorites(favoriteIds);

    const artists = await readArtists();
    const favorites = artists.filter(artist => favoriteIds.includes(artist.id));

    response.json(favorites);
});

// DELETE ROUTE - delete existing fav by id
app.delete("/favorites/:id", async (request, response) => {
    const favId = Number(request.params.id);
    const favs = await readFavorites();

    if (favs.includes(favId)) {
        const newFavs = favs.filter(id => id !== favId);
        writeFavorites(newFavs);

        const artists = await readArtists();
        const favorites = artists.filter(artist => newFavs.includes(artist.id));

        response.json(favorites);
    } else {
        response.status(404).json({ error: "Favorites does not contain the id!" });
    }
});

// ========== HELPER FUNCTIONS ========== //

// ---------- "/artists" ----------//

async function readArtists() {
    const json = await fs.readFile("./data/artists.json");
    return JSON.parse(json);
}

async function writeArtists(artists) {
    const json = JSON.stringify(artists);
    await fs.writeFile("./data/artists.json", json);
}

// ---------- "/favorites" ----------//
async function readFavorites() {
    const json = await fs.readFile("./data/favorites.json");
    return JSON.parse(json);
}

async function writeFavorites(favorites) {
    const json = JSON.stringify(favorites);
    await fs.writeFile("./data/favorites.json", json);
}
