import { Router } from "express";
import { getDatabase } from "../db-connect.js";
import { ObjectId } from "mongodb";

const artistsRouter = Router();

// GET Endpoint "/artists" - get all artists
artistsRouter.get("/", async (request, response) => {
    const db = await getDatabase();
    const artistsCollection = db.collection("artists");
    const artists = await artistsCollection.find().toArray(); // Use toArray() to retrieve documents as an array
    response.json(artists);
});

// GET Endpoint "/artists/search?q=taylor" - get all artists
// Ex: http://localhost:3333/artists/search?q=cy
artistsRouter.get("/search", async (request, response) => {
    const searchString = request.query.q;
    const db = await getDatabase();
    const artistsCollection = db.collection("artists");

    const searchQuery = {
        name: {
            $regex: searchString, // Use the provided search string
            $options: "i" // Case-insensitive search
        }
    };

    const searchResult = await artistsCollection.find(searchQuery).toArray();
    response.json(searchResult);
});

// GET Endpoint "/artists/:id" - get one artist
artistsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const db = await getDatabase();
    const artistsCollection = db.collection("artists");
    const artists = await artistsCollection.findOne({ _id: new ObjectId(id) });
    response.json(artists);
});

// GET Endpoint "/artists/:id" - get one artist
artistsRouter.get("/:id/albums", async (request, response) => {
    const id = request.params.id;

    const query = /*sql*/ `
        SELECT DISTINCT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
        FROM albums
        INNER JOIN artists_albums ON albums.id = artists_albums.album_id
        INNER JOIN artists ON artists_albums.artist_id = artists.id
        WHERE artists.id = ?;`;

    const values = [id];

    const [results] = await dbConnection.execute(query, values);
    response.json(results);
});

export default artistsRouter;
