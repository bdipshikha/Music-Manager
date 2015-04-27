var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require("body-parser");

var db = new sqlite3.Database("./db/songs.db");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({ extended: false }));
	

// to get all songs

app.get("/songs", function(req, res) {
	db.all("SELECT * FROM songs", function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			console.log(rows);
			res.json(rows);
		}
	});
});

// create a song

app.post("/songs", function(req, res) {
	var title = req.body.title;
	var artist = req.body.artist;
	var album = req.body.album;

	db.run("INSERT INTO songs (title, artist, album) VALUES (?, ?, ?);", title, artist, album, function(err) {

		if (err) {
			console.log(err);
		} else {
			var id = this.lastID; // weird way of getting the id of last inserted
			db.get("SELECT * FROM songs WHERE id = ?;", id, function(err, row) {
				if (err) {
					console.log(err);
				} else {
					console.log(row)
					res.json(row);
				}
			});
		}
	});
});

// delete a song

app.delete("/song/:id", function(req, res) {
	var id = req.params.id;
	db.run("DELETE FROM songs WHERE id = ?;", id, function(err) {
		if (err) {
			//console.log(err);
		} else {
			res.json({ deleted: true });
				
		}
	});
});

// update a song

app.put("/song/:id", function(req, res) {
	console.log("It works!")
	var id = req.params.id;
	var title = req.body.title;
	var artist = req.body.artist;
	var album = req.body.album;
	db.run("UPDATE songs SET title = ?, artist = ?, album = ? WHERE id = ?;", title, artist, album, id, function(err) {
		if (err) {
			console.log("Still works!")
			console.log(err);
		} else {
			db.get("SELECT * FROM songs WHERE id = ?;", id, function(err, row) {
				if (err) {
					console.log(err);
				} else {
					console.log("working")
					res.json(row);
				}
			});
		}
	});
});


app.listen(3000);
console.log("Listening on port 3000");