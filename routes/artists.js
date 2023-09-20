import { Router } from "express";
import dbConnection from "../db-connect.js";

const artistsRouter = Router();

// GET Endpoint "/artists" - get all artists
artistsRouter.get("/", async (request, response) => {
    const query = /*sql*/ `
    SELECT * 
    FROM artists ORDER BY name;`;

    const [results, fields] = await dbConnection.execute(query);
    response.json(results);
});

// GET Endpoint "/artists/search?q=taylor" - get all artists
// Ex: http://localhost:3333/artists/search?q=cy
artistsRouter.get("/search", async (request, response) => {
    const searchString = request.query.q;
    const query = /*sql*/ `
    SELECT * 
    FROM artists
    WHERE name LIKE ?
    ORDER BY name`;
    const values = [`%${searchString}%`];

    const [results, fields] = await dbConnection.execute(query, values);
    response.json(results);
});

// GET Endpoint "/artists/:id" - get one artist
artistsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const query = /*sql*/ `
    SELECT * 
    FROM artists WHERE id=?;`; // sql query
    const values = [id];

    const [results, fields] = await dbConnection.execute(query, values);
    response.json(results);
});

// GET Endpoint "/artists/:id" - get one artist
artistsRouter.get("/:id/albums", async (request, response) => {
    const id = request.params.id;

    const query = /*sql*/ `
        SELECT DISTINCT albums.*, 
                        artists.name AS artistName,
                        artists.id AS artistId
        FROM albums
        LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
        LEFT JOIN songs ON albums_songs.song_id = songs.id
        LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
        LEFT JOIN artists ON artists_songs.artist_id = artists.id
        WHERE artists_songs.artist_id = ?;`;

    const values = [id];

    const [results, fields] = await dbConnection.execute(query, values);
    response.json(results);
});

export default artistsRouter;
