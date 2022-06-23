const mongoose = require('mongoose')

const mongouri = "mongodb://localhost:27017/iNotes"


const connectToMongo = () =>{
    mongoose.connect(mongouri,()=>{
        console.log("Connectd to Mongo Succesfully")
    })
}

module.exports= connectToMongo;