const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,   // object id of users in user collections is acting as foriegn key
        ref:"user"   // name of collection whose objectid is used as foreign key
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema)