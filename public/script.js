// delete a song
var deleteSong = function() {
    var li = this.parentNode; // get the parent node (li) of the delete button
    var id = li.id.substring(4); 
    // i.e. song would be 4 (see li.setAttribute below) because 
    //song is (0-3) so it will start from 4.
   
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/song/" + id);
    xhr.addEventListener("load", function() {
        if (JSON.parse(xhr.responseText).deleted === true) {
            li.remove();
        }
    });
''
    xhr.send();
}

// update a song
var updateSong = function(li, newTitle, newArtist, newAlbum) {
    

    // below: i.e. songs4 would be 4 (see li.setAttribute below) and it 
    var id = li.id.substring(4); 
    
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/song/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var returnedSong = JSON.parse(xhr.response);
        console.log("good");
        createLiForSong(li, returnedSong);
    });

    var updatedSong = {
            title: newTitle,
            artist: newArtist,
            album: newAlbum,
        } // removed the colon
        alert(JSON.stringify(updatedSong));
    xhr.send(JSON.stringify(updatedSong));
};

// edit a song
var editSong = function(li, title, artist, album) {
    li.innerHTML = "";
    var id = li.id.substring(4); // i.e. songs3 would be 3 (see li.setAttribute below)
   
    // song title input textbox

    var titleField = document.createElement("input");
    titleField.setAttribute("type", "text");
    titleField.value = title;
    li.appendChild(titleField);


    // song artist input textbox

    var artistField = document.createElement("input");
    artistField.setAttribute("type", "text");
    artistField.value = artist;
    li.appendChild(artistField);

    // song album input textbox

    var albumField = document.createElement("input");
    albumField.setAttribute("type", "text");
    albumField.value = album;
    li.appendChild(albumField);


    var updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.addEventListener("click", function() {
        var newTitle = titleField.value;
        var newArtist = artistField.value;
        var newAlbum = albumField.value;
        updateSong(li, newTitle, newArtist, newAlbum);
    });
    li.appendChild(updateButton);
};

// set up li for song
var createLiForSong = function(li, song) {
    li.innerHTML = "";
    li.setAttribute("id", "song" + song.id);
    var songText = song.title;
    var songTextNode = document.createTextNode(songText);

    var spanForText = document.createElement("span");
    spanForText.appendChild(songTextNode);
    spanForText.setAttribute("style", "margin:10px;");

    li.appendChild(spanForText);

    // add edit button to song
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
        editSong(li, song.title, song.artist, song.album);
    });
    li.appendChild(editButton);

    // add delete button to song
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteSong);
    li.appendChild(deleteButton);
} // removed colon

// show one song
var showSong = function(song) {
    var li = document.createElement("li");
    createLiForSong(li, song);
    var ul = document.getElementById("songsList");
    ul.appendChild(li);
};

// show all song
var showAllSongs = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/songs");
    xhr.addEventListener("load", function() {
        var songs = JSON.parse(xhr.response);
        songs.forEach(function(song) {
            showSong(song);
        });
    });
    xhr.send();
};

//  add new song button to create song route
var addNewSongButton = document.getElementById("addNewSong");
addNewSongButton.addEventListener("click", function() {
    var newTitle = document.getElementById("newSongTitle");
    var newArtist = document.getElementById("newSongArtist");
    var newAlbum = document.getElementById("newSongAlbum");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/songs");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var returnedSong = JSON.parse(xhr.response);
        console.log(showSong)
        showSong(returnedSong);
        newTitle.value = "";
        newArtist.value = "";
        newAlbum.value = "";
    });

    var newSong = {
        title: newTitle.value,
        artist: newArtist.value,
        album: newAlbum.value
    }
    xhr.send(JSON.stringify(newSong));
});

// 

    

// called when page loads
showAllSongs();