import express from "express";
import cors from "cors";
import dbConnection from "./db-connect.js";

const app = express();
const port = process.env.SERVER_PORT || 3333;
app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// ------ REST ENDPOINTS ------ //

// GET Endpoint "/"
app.get("/", (request, response) => {
    response.send("Node Express Musicbase REST API");
});

// GET Endpoint "/artists" - get all artists
app.get("/artists", (request, response) => {
    const queryString = "SELECT * FROM artists ORDER BY name;";
    dbConnection.query(queryString, (error, results, fields) => {
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
    const query = "SELECT * FROM artists WHERE id=?;"; // sql query
    const values = [id];

    dbConnection.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// GET Endpoint "/songs" - get all songs
app.get("/songs", (request, response) => {
    const queryString = "SELECT * FROM songs ORDER BY title;";
    dbConnection.query(queryString, (error, results, fields) => {
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
    const query = "SELECT * FROM songs WHERE id=?;"; // sql query
    const values = [id];

    dbConnection.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// GET Endpoint "/albums" - get all albums
app.get("/albums", (request, response) => {
    const queryString = "SELECT * FROM albums ORDER BY title;";
    dbConnection.query(queryString, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// GET Endpoint "/songs/:id" - get one song
app.get("/albums/:id", (request, response) => {
    const id = request.params.id;
    const query = "SELECT * FROM albums WHERE id=?;"; // sql query
    const values = [id];

    dbConnection.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});
