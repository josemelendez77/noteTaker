
const express = require("express");
const apiRouter = express.Router();
const fs = require("fs");

apiRouter.get("/api/notes", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

    
        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});

apiRouter.post("/api/notes", (req, res) => {
    let note = req.body;
    note["id"] = Date.now();
    note["title"] = req.body.title;
    note["text"] = req.body.text;

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        
        const parsedFile = JSON.parse(file);
        parsedFile.push(note);

        const newStringifiedFile = JSON.stringify(parsedFile);
    
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The new note was appended to the file!");
        });
        
        return res.send(JSON.parse(newStringifiedFile));
    });    
});


//DELETE
//receive a query parameter containing the id of a note to delete.
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
//apiRouter.delete();

apiRouter.delete("/api/notes/:id", (req, res) => {
    //filter method by ID, create a new array without that ID
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        // deleted note id
        let deletedNoteId = req.params.id;

        // parse db.json into a JSON object
        const parsedFile = JSON.parse(file);

        // filter method by ID, create a new array without that ID
        const newParsedFile = parsedFile.filter(elem => elem.id != deletedNoteId);

        //Create new stringify of the combined file to write back to file
        const newStringifiedFile = JSON.stringify(newParsedFile);

        // re-write the file as the combined file
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The note was deleted!");
        });
        
        // return parsed version of new stringified file to read back to the page
        return res.send(JSON.parse(newStringifiedFile));
    });
});

module.exports = apiRouter;

// References
// https://expressjs.com/en/guide/routing.html