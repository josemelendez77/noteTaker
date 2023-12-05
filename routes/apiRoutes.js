// DEPENDENCIES
// Routing
const express = require("express");
const apiRouter = express.Router();
// file-system
const fs = require("fs");

//GET
// Read the `db.json` file and return all saved notes as JSON.
apiRouter.get("/api/notes", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        // return parsed note text
        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});

//POST
// receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
apiRouter.post("/api/notes", (req, res) => {
    // 1. read db file first and parse it! 
    // 2. then, push new note to it
    // 3. then write back the stringified version of it

    // construct incoming note for JSON object
    let note = req.body;
    note["id"] = Date.now();
    note["title"] = req.body.title;
    note["text"] = req.body.text;

    // reading from the file: have string to convert into an object - use parse
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        // parse db.json into a JSON object
        const parsedFile = JSON.parse(file);
        // push the new note onto the JSON object
        parsedFile.push(note);

        // Create new stringify of the combined file to write back to file
        const newStringifiedFile = JSON.stringify(parsedFile);
    
        // re-write the file as the combined file
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The new note was appended to the file!");
        });
        
        // return parsed version of new stringified file to read back to the page
        // adding this resolved ERR EMPTY RESPONSE
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