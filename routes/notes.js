const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Library to create unique IDs
const { writeToFile, readAndAppend } = require('../helpers/Fs.js');

// GET root route, display all notes in db
notes.get('/', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    let json = JSON.parse(data);
    res.json(json);
});

// CREATE new note
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    // Confirm new note has both title and text before trying to create 
    if (title && text) {
        let createNote = {
            id: uuidv4(),
            title: title,
            text: text
        }
        // Add created note to the database
        readAndAppend(createNote, path.join(__dirname, '../db/db.json'));
        res.status(200).json({message:"Note Created"});
    } else {
        res.status(500).json({message:"Unable to create Note"});
    }
});

// BONUS: DELETE Note by ID
notes.delete('/:id', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    let notes = JSON.parse(data);

    // filter to match every note with an ID other than the one to be deleted
    updatedNotes = notes.filter((note) => note.id != id);

    writeToFile(path.join(__dirname, '../db/db.json'), updatedNotes);
    res.status(200).json({message:"Note Deleted"});
});

module.exports = notes;