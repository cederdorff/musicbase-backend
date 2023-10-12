-- slet database
DROP DATABASE IF EXISTS musicbase;

-- opret database
CREATE DATABASE musicbase;

-- brug/ selekter database
USE musicbase;

-- Opret tabel for kunstnere
CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    image VARCHAR(255),  -- Billed-URL
    birthdate DATE,  -- Fødselsdato
    gender VARCHAR(10)  -- Køn
);

-- Opret tabel for sange
CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    length VARCHAR(8)
);

-- Opret tabel for kunstnere-sange-forhold
CREATE TABLE artists_songs (
    artist_id INT,
    song_id INT,
    PRIMARY KEY (artist_id, song_id),
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Opret tabel for albums
CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE
);

-- Opret tabel for sange-album-forhold
CREATE TABLE albums_songs (
    album_id INT,
    song_id INT,
    position INT,
    PRIMARY KEY (album_id, song_id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Opret tabel for kunstnere-albums-forhold
CREATE TABLE artists_albums (
    artist_id INT,
    album_id INT,
    PRIMARY KEY (artist_id, album_id),
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (album_id) REFERENCES albums(id)
);


-- Indsæt data for kunstnere
INSERT INTO artists (name, genre, image, birthdate, gender) VALUES
    ('Adele', 'Pop', 'https://upload.wikimedia.org/wikipedia/commons/5/52/Adele_for_Vogue_in_2021.png', '1988-05-05', 'Female'),
    ('Ed Sheeran', 'Pop', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/500px-Ed_Sheeran-6886_%28cropped%29.jpg', '1991-02-17', 'Male'),
    ('Beyoncé', 'R&B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png/500px-Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png', '1981-09-04', 'Female'),
    ('Miley Cyrus', 'Pop', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Miley_Cyrus_Primavera19_-226_%2848986293772%29_%28cropped%29.jpg/500px-Miley_Cyrus_Primavera19_-226_%2848986293772%29_%28cropped%29.jpg', '1992-11-23', 'Female'),
    ('Ariana Grande', 'Pop', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ariana_Grande_by_Marcus_Ingvarsson_%28SWE%29_%28cropped%29.png/500px-Ariana_Grande_by_Marcus_Ingvarsson_%28SWE%29_%28cropped%29.png', '1993-06-26', 'Female'),
    ('Drake', 'Rap', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Drake_2019_by_Glenn_Francis_%28cropped%29.jpg/500px-Drake_2019_by_Glenn_Francis_%28cropped%29.jpg', '1986-10-24', 'Male');

-- Indsæt data for sange
INSERT INTO songs (title, release_date, length) VALUES
    ('Hello', '2015-10-23', '4:55'),
    ('Shape of You', '2017-01-06', '3:53'),
    ('Crazy in Love', '2003-05-20', '3:56'),
    ('Send My Love', '2016-05-16', '3:43'),
    ('When We Were Young', '2015-11-17', '4:50'),
    ('Castle on the Hill', '2017-01-06', '4:21'),
    ('Galway Girl', '2017-01-06', '2:53'),
    ('Naughty Girl', '2003-06-24', '3:28'),
    ('Baby Boy', '2003-06-24', '4:05'),
    ('Flowers', '2023-01-12', '3:20'),
    ('River', '2023-03-10', '2:42'),
    ('You', '2020-03-10', '2:59'),
    ('Easy on Me', '2021-10-15', '3:44'),
    ('Thank U, Next', '2018-11-03', '3:27'),
    ('God''s Plan', '2018-01-19', '3:18'),
    ('7 Rings', '2019-01-18', '2:58'),
    ('In My Feelings', '2018-07-10', '3:37');

-- Indsæt data for kunstnere-sange-forhold
INSERT INTO artists_songs (artist_id, song_id) VALUES
    (1, 1),  -- Adele sang Hello
    (1, 13),  -- Adele sang Easy on Me
    (1, 4),  -- Adele sang Send My Love
    (1, 5),  -- Adele sang When We Were Young
    (3, 3),  -- Beyoncé sang Crazy in Love
    (3, 8),  -- Beyoncé sang Naughty Girl
    (3, 9),  -- Beyoncé sang Baby Boy
    (2, 2),  -- Ed Sheeran sang Shape of You
    (2, 6),  -- Ed Sheeran sang Castle on the Hill
    (2, 7),  -- Ed Sheeran sang Galway Girl
    (4, 10),  -- Miley Cyrus sang Flowers
    (4, 11),  -- Miley Cyrus sang River
    (4, 12),  -- Miley Cyrus sang You
    (5, 14),  -- Ariana Grande sang Thank U, Next
    (5, 15),  -- Ariana Grande sang 7 Rings
    (6, 16),  -- Drake sang God's Plan
    (6, 17);  -- Drake sang In My Feelings

-- Indsæt data for albums
INSERT INTO albums (title, release_date) VALUES
    ('25', '2015-11-20'),
    ('÷ (Divide)', '2017-03-03'),
    ('Dangerously in Love', '2003-06-24'),
    ('Flowers', '2023-03-10'),
    ('30', '2021-11-19'),
    ('Thank U, Next', '2019-02-08'),
    ('Scorpion', '2018-06-29');

INSERT INTO artists_albums (artist_id, album_id) VALUES
    (1, 1),
    (1, 5),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 6),
    (6, 7);

-- Indsæt data for albums-sange-forhold
INSERT INTO albums_songs (album_id, song_id, position) VALUES
    (1, 1, 1),  -- Album 25 indeholder sangen Hello
    (1, 4, 2),  -- Album 25 indeholder sangen Send My Love
    (1, 5, 4),  -- Album 25 indeholder sangen When We Were Young
    (5, 13, 2),  -- Album 30 indeholder sangen Easy on Me
    (3, 3, 1),  -- Album Dangerously in Love indeholder sangen Crazy in Love
    (3, 8, 2),  -- Album Dangerously in Love indeholder sangen Naughty Girl
    (3, 9, 3),  -- Album Dangerously in Love indeholder sangen Baby Boy
    (2, 2, 4),  -- Album ÷ (Divide) indeholder sangen Shape of You
    (2, 6, 2),  -- Album ÷ (Divide) indeholder sangen Castle on the Hill
    (2, 7, 6),  -- Album ÷ (Divide) indeholder sangen Galway Girl
    (4, 10, 1),  -- Album Flowers indeholder sangen Flowers
    (4, 11, 7),  -- Album Flowers indeholder sangen River
    (4, 12, 5), -- Album Flowers indeholder sangen You
    (6, 14, 1),  -- Album Thank U, Next indeholder sangen Thank U, Next
    (6, 15, 2),  -- Album Thank U, Next indeholder sangen 7 Rings
    (7, 16, 1),  -- Album Scorpion indeholder sangen God's Plan
    (7, 17, 2);  -- Album Scorpion indeholder sangen In My Feelings

-- Join, artister og sange
SELECT artists.name AS artist_name,
       songs.title AS song_title,
       songs.length AS song_length,
       songs.release_date AS song_release_date
FROM artists
INNER JOIN artists_songs ON artists.id = artists_songs.artist_id
INNER JOIN songs ON artists_songs.song_id = songs.id;

-- Join, Albums og sange med kunstnere
SELECT albums.title AS album_title,
       songs.title AS song_title,
       artists.name AS artist_name
FROM albums
INNER JOIN albums_songs ON albums.id = albums_songs.album_id
INNER JOIN songs ON albums_songs.song_id = songs.id
INNER JOIN artists_songs ON songs.id = artists_songs.song_id
INNER JOIN artists ON artists_songs.artist_id = artists.id;

--
SELECT albums.*,
       songs.title AS songTitle,
       songs.length AS songLength,
       songs.release_date AS songReleaseDate,
       artists.name AS artist_name
FROM albums
INNER JOIN albums_songs ON albums.id = albums_songs.album_id
INNER JOIN songs ON albums_songs.song_id = songs.id
INNER JOIN artists_songs ON songs.id = artists_songs.song_id
INNER JOIN artists ON artists_songs.artist_id = artists.id
WHERE albums.id = 2;


SELECT albums.*,
       songs.title AS songTitle,
       songs.length AS songLength,
       songs.release_date AS songReleaseDate,
       artists.name AS artist_name
FROM albums
LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
LEFT JOIN songs ON albums_songs.song_id = songs.id
LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
LEFT JOIN artists ON artists_songs.artist_id = artists.id
WHERE albums.id = 2;



-- Join, Kunstnere og deres sange med albuminfo
SELECT artists.name AS artist_name,
       songs.title AS song_title,
       albums.title AS album_title
FROM artists
INNER JOIN artists_songs ON artists.id = artists_songs.artist_id
INNER JOIN songs ON artists_songs.song_id = songs.id
INNER JOIN albums_songs ON songs.id = albums_songs.song_id
INNER JOIN albums ON albums_songs.album_id = albums.id;

-- Join Sange og deres kunstnere med genreinfo
SELECT songs.*,
       artists.name AS artistName,
       artists.id AS artistId,
       artists.genre AS artistGenre
FROM songs
INNER JOIN artists_songs ON songs.id = artists_songs.song_id
INNER JOIN artists ON artists_songs.artist_id = artists.id;

SELECT songs.*,
            artists.name AS artistName,
            artists.id AS artistId,
            artists.genre AS artistGenre
FROM songs
INNER JOIN artists_songs ON songs.id = artists_songs.song_id
INNER JOIN artists ON artists_songs.artist_id = artists.id
WHERE songs.id = 2;

-- Albums med kunstnere (ingen dubbletter)
SELECT DISTINCT albums.*, artists.name
FROM albums
INNER JOIN albums_songs ON albums.id = albums_songs.album_id
INNER JOIN songs ON albums_songs.song_id = songs.id
INNER JOIN artists_songs ON songs.id = artists_songs.song_id
INNER JOIN artists ON artists_songs.artist_id = artists.id;

-- Hvis du kun vil have unikke rækker fra enten "albums" eller "artists" tabellen,
-- kan du bruge en "LEFT JOIN" i stedet for en "INNER JOIN". Dette sikrer,
-- at du får alle rækker fra den ene tabel og de matchende rækker fra den anden tabel.
SELECT DISTINCT albums.*, artists.name
FROM albums
LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
LEFT JOIN songs ON albums_songs.song_id = songs.id
LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
LEFT JOIN artists ON artists_songs.artist_id = artists.id;

SELECT DISTINCT albums.*,
       artists.name AS artistName,
       artists.id AS artistId
FROM albums
LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
LEFT JOIN songs ON albums_songs.song_id = songs.id
LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
LEFT JOIN artists ON artists_songs.artist_id = artists.id;


SELECT DISTINCT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
FROM albums
LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
LEFT JOIN songs ON albums_songs.song_id = songs.id
LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
LEFT JOIN artists ON artists_songs.artist_id = artists.id
WHERE artists_songs.artist_id = 1;

SELECT albums.*,
                artists.name AS artistName,
                albums_songs.position,
                songs.id AS songId,
                songs.title AS songTitle,
                songs.length AS songLength,
                songs.release_date AS songReleaseDate,
                artists.id AS artistId
            FROM albums
            JOIN albums_songs ON albums.id = albums_songs.album_id
            JOIN songs ON albums_songs.song_id = songs.id
            JOIN artists_songs ON songs.id = artists_songs.song_id
            JOIN artists ON artists_songs.artist_id = artists.id
            WHERE albums.id = 2
            ORDER BY albums_songs.position;


SELECT DISTINCT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
            FROM albums
            LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
            LEFT JOIN songs ON albums_songs.song_id = songs.id
            LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
            LEFT JOIN artists ON artists_songs.artist_id = artists.id;

SELECT songs.*,
                    artists.name AS artistName,
                    artists.id AS artistId,
                    artists.genre AS artistGenre
            FROM songs
            INNER JOIN artists_songs ON songs.id = artists_songs.song_id
            INNER JOIN artists ON artists_songs.artist_id = artists.id;

SELECT DISTINCT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
            FROM albums
            JOIN albums_songs ON albums.id = albums_songs.album_id
            JOIN songs ON albums_songs.song_id = songs.id
            JOIN artists_songs ON songs.id = artists_songs.song_id
            JOIN artists ON artists_songs.artist_id = artists.id;

SELECT artists.name AS artist_name,
       artists.image AS artist_image,
       albums.title AS album_title,
       albums.release_date AS album_release_date
FROM artists
JOIN artists_albums ON artists.id = artists_albums.artist_id
JOIN albums ON artists_albums.album_id = albums.id
ORDER BY artists.name;

SELECT albums.*,
                artists.name AS artistName,
                albums_songs.position,
                songs.id AS songId,
                songs.title AS songTitle,
                songs.length AS songLength,
                songs.release_date AS songReleaseDate,
                artists.id AS artistId
            FROM albums
            LEFT JOIN albums_songs ON albums.id = albums_songs.album_id
            LEFT JOIN songs ON albums_songs.song_id = songs.id
            LEFT JOIN artists_songs ON songs.id = artists_songs.song_id
            LEFT JOIN artists ON artists_songs.artist_id = artists.id
            WHERE albums.id = 1
            ORDER BY albums_songs.position;

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
WHERE albums.id = 2;