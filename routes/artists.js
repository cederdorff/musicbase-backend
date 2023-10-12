import { Router } from "express";
import dbConnection from "../db-connect.js";

const artistsRouter = Router();

// GET Endpoint "/artists" - get all artists
artistsRouter.get("/", async (request, response) => {
    const query = /*sql*/ `
    SELECT * 
    FROM artists ORDER BY name;`;

    const [results] = await dbConnection.execute(query);
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

    const [results] = await dbConnection.execute(query, values);
    response.json(results);
});

// GET Endpoint "/artists/:id" - get one artist
artistsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const query = /*sql*/ `
        SELECT * 
        FROM artists WHERE id=?;`; // sql query

    const values = [id];

    const [results] = await dbConnection.execute(query, values);
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
        INNER JOIN artists_albums ON albums.id = artists_albums.album_id
        INNER JOIN artists ON artists_albums.artist_id = artists.id
        WHERE artists.id = ?;`;

    const values = [id];

    const [results] = await dbConnection.execute(query, values);
    response.json(results);
});

export default artistsRouter;
