import { Router } from "express";
import dbConnection from "../db-connect.js";

const albumsRouter = Router();

// GET Endpoint "/albums" - get all albums
albumsRouter.get("/", async (request, response) => {
    const query = /*sql*/ `
            SELECT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
            FROM artists
            JOIN artists_albums ON artists.id = artists_albums.artist_id
            JOIN albums ON artists_albums.album_id = albums.id
            ORDER BY artists.name;
    `;
    const [results] = await dbConnection.execute(query);
    response.json(results);
});

// GET Endpoint "/albums/:id"
// albumsRouter.get("/:id", async (request, response) => {
//     const id = request.params.id;

//     const query = /*sql*/ `
//             SELECT albums.*,
//                 artists.name AS artistName,
//                 songs.id AS songId,
//                 songs.title AS songTitle,
//                 songs.length AS songLength,
//                 songs.release_date AS songReleaseDate,
//                 artists.id AS artistId
//             FROM albums
//             LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
//             LEFT JOIN songs ON albums_songs.song_id = songs.id
//             LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
//             LEFT JOIN artists ON artists_songs.artist_id = artists.id
//             WHERE albums.id = ?;
//     `;
//     const values = [id];

//     const [results] = await dbConnection.execute(query, values);
// response.json(results);
// });

// GET Endpoint "/albums/:id"
albumsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    const query = /*sql*/ `
            SELECT albums.*,
                artists.name AS artistName,
                albums_songs.position,
                songs.id AS songId,
                songs.title AS songTitle,
                songs.length AS songLength,
                songs.release_date AS songReleaseDate,
                artists.id AS artistId
            FROM albums
            INNER JOIN artists_albums ON albums.id = artists_albums.album_id
            INNER JOIN artists ON artists_albums.artist_id = artists.id
            INNER JOIN albums_songs ON albums.id = albums_songs.album_id
            INNER JOIN songs ON albums_songs.song_id = songs.id
            WHERE albums.id = ?
            ORDER BY albums_songs.position;
    `;
    const values = [id];

    const [results] = await dbConnection.execute(query, values);

    if (results[0]) {
        const album = results[0];
        const albumWithSongs = {
            id: album.id,
            title: album.title,
            releaseDate: album.release_date,
            artistName: album.artistName,
            songs: results.map(song => {
                return {
                    id: song.songId,
                    title: song.songTitle,
                    length: song.songLength,
                    releaseDate: song.songReleaseDate,
                    position: song.position
                };
            })
        };

        response.json(albumWithSongs);
    } else {
        response.json({ message: "No album found" });
    }
});

// GET Endpoint "/albums/:id/songs" - get album with songs
albumsRouter.get("/:id/songs", async (request, response) => {
    const id = request.params.id;

    const query = /*sql*/ `
        SELECT albums.id AS albumId,
            albums.title AS albumTitle,
            albums.release_date AS albumReleaseDate,
            songs.id AS songId,
            songs.title AS songTitle,
            songs.length AS songLength,
            songs.release_date AS songReleaseDate,
            artists.name AS artistName
        FROM albums
        INNER JOIN albums_songs ON albums.id = albums_songs.album_id
        INNER JOIN songs ON albums_songs.song_id = songs.id
        INNER JOIN artists_songs ON songs.id = artists_songs.song_id
        INNER JOIN artists ON artists_songs.artist_id = artists.id
        WHERE albums.id = ?;
    `;
    const values = [id];

    const [results] = await dbConnection.execute(query, values);

    if (results.length) {
        response.json(results);
    } else {
        response.json({ message: "No album found" });
    }
});

export default albumsRouter;
