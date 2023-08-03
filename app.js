// ========== IMPORTS ========== //
import express from "express";
import cors from "cors";
import dbConnection from "./db-connect.js";

// ========== APP SETUP ========== //
const app = express();
const port = process.env.SERVER_PORT || 3333;
app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// ========== REST ENDPOINTS ========== //

// GET Endpoint "/"
app.get("/", (request, response) => {
    response.send("Node Express Musicbase REST API");
});

// GET Endpoint "/artists" - get all artists
app.get("/artists", (request, response) => {
    const queryString = "SELECT * FROM artists ORDER BY name;";
    dbConnection.query(queryString, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// GET Endpoint "/artists/:id" - get one artist
app.get("/artists/:id", (request, response) => {
    const id = request.params.id;
    const queryString = "SELECT * FROM artists WHERE id=?;"; // sql query
    const values = [id];

    dbConnection.query(queryString, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// GET Endpoint "/songs" - get all songs
app.get("/songs", (request, response) => {
    const queryString = `
        SELECT * FROM artists, songs
            WHERE songs.artist_id = artists.id
            ORDER BY artists.name`;

    dbConnection.query(queryString, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// GET Endpoint "/songs/:id" - get one song
app.get("/songs/:id", (request, response) => {
    const id = request.params.id;
    const queryString = `
        SELECT * FROM artists, songs
            WHERE songs.artist_id = artists.id
            && songs.id=?;`; // sql query
    const values = [id];

    dbConnection.query(queryString, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// GET Endpoint "/albums" - get all albums
app.get("/albums", (request, response) => {
    const queryString = `
        SELECT * FROM artists, albums
            WHERE albums.artist_id = artists.id
            ORDER BY albums.title;
    `;
    dbConnection.query(queryString, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// GET Endpoint "/albums/:id" - get one album
app.get("/albums/:id", (request, response) => {
    const id = request.params.id;
    const queryString = `
        SELECT albums.title as albumTitle, songs.id as songId, songs.title as songTitle, songs.length, songs.release_date, songs_on_albums.position FROM albums, songs, songs_on_albums
            WHERE albums.id = songs_on_albums.album_id
                   && songs.id = songs_on_albums.song_id
                   && albums.id =? 
            ORDER BY songs_on_albums.position;
    `;
    const values = [id];

    dbConnection.query(queryString, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            const album = {
                title: results[0].albumTitle,
                songs: results.map(song => {
                    return {
                        id: song.songId,
                        title: song.songTitle,
                        length: song.length,
                        releaseDate: song.release_date,
                        position: song.position
                    };
                })
            };
            response.json(album);
        }
    });
});
