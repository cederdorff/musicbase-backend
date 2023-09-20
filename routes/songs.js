import { Router } from "express";
import dbConnection from "../db-connect.js";

const songsRouter = Router();

// GET Endpoint "/songs" - get all songs
songsRouter.get("/", async (request, response) => {
    const query = /*sql*/ `
            SELECT songs.*,
                    artists.name AS artistName,
                    artists.id AS artistId,
                    artists.genre AS artistGenre
            FROM songs
            INNER JOIN artists_songs ON songs.id = artists_songs.song_id
            INNER JOIN artists ON artists_songs.artist_id = artists.id;    
    
    `;

    const [results] = await dbConnection.execute(query);
    response.json(results);
});

// GET Endpoint "/songs/:id" - get one song
songsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const query = /*sql*/ `
            SELECT songs.*,
                    artists.name AS artistName,
                    artists.id AS artistId,
                    artists.genre AS artistGenre
            FROM songs
            INNER JOIN artists_songs ON songs.id = artists_songs.song_id
            INNER JOIN artists ON artists_songs.artist_id = artists.id  
            WHERE songs.id = ?;`; // sql query
    const values = [id];

    const [results] = await dbConnection.execute(query, values);
    response.json(results);
});

songsRouter.post("/", async (request, response) => {
    const song = request.body;

    // create new song
    const songQuery = "INSERT INTO songs (title, release_date, length) VALUES(?, ?, ?)";
    const songValues = [song.title, song.releaseDate, song.length];

    const [songResult] = await dbConnection.execute(songQuery, songValues);
    // id of newly created song
    const newSongId = songResult.insertId;

    // create new arist-song relation in artists_songs
    const artistSongQuery = "INSERT INTO artists_songs (artist_id, song_id) VALUES(?, ?)";
    const artistSongValues = [song.artistId, newSongId];

    const [artistSongResult] = await dbConnection.execute(artistSongQuery, artistSongValues);
    console.log(artistSongResult);

    response.json({ message: "New song created!" });
});

export default songsRouter;
