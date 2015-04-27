DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
	id INTEGER PRIMARY KEY,
	title TEXT,
	artist TEXT,
	album TEXT
);

DROP TABLE IF EXISTS playlists;
CREATE TABLE playlists (
	id INTEGER PRIMARY KEY,
	song_id TEXT,
	title TEXT
);