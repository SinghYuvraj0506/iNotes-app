
const connectToMongo = require("./db")
const express = require("express")

connectToMongo();
let port = 5000

const app = express()

app.use(express.json())   // it is a middleware used to take req.body in json form

// Available Routes
app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Welcome to the port ${port}`)
})

