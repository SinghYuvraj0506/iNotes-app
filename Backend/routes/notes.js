const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

const router = express.Router();

// ROUTE 1: fetching all the notes using /fetchallnotes endpoint
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        let notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
});


// ROUTE 2: adding notes using /addnotes endpoint
router.post("/addnotes", fetchuser,
  [
    body("title","Enter a title").isLength({ min: 1 }),
    body("description", "Description should contain atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
        // if there are some errors then the response will be the errors itself
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = await Notes.create({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.user.id
        })
        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
  }
);

// ROUTE 3: updating notes using /updatenotes endpoint
router.put("/updatenotes/:id", fetchuser, async (req,res) =>{
    const {title,description,tag} = req.body;
    const newnote = {}          // first we are taking the user input and storing it
    if(title){newnote.title = title}
    if(description){newnote.description = description}
    if(tag){newnote.tag = tag}
    let note = await Notes.findById(req.params.id)

    if(!note){          // checking iff the notes with such id is present or nor in the database
        return res.status(401).send("Note not found")
    }

    if(note.user.toString() !== req.user.id){      // checking if the owner of the note is the same person wth the authentification token
        return res.status(401).send("Not Allowed")
    }

    try {
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true}) //updating the notes
        res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

// ROUTE 4: deleting notes using /deletenotes endpoint
router.delete("/deletenotes/:id", fetchuser, async (req,res) =>{
    let note = await Notes.findById(req.params.id)

    if(!note){          // checking iff the notes with such id is present or nor in the database
        return res.status(401).send("Note not found")
    }

    if(note.user.toString() !== req.user.id){      // checking if the owner of the note is the same person wth the authentification token
        return res.status(401).send("Not Allowed")
    }

    try {
        note = await Notes.findByIdAndDelete(req.params.id) //deleting the notes
        res.json({Success:"Note has been successfully deleted",note:note})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router;
