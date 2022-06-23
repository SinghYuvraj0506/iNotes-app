const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const fetchUser = require('../middleware/fetchuser')

const router = express.Router()
const JWT_SECRET = "YuvrajSinghisaGoodBOY"

// first the req value is validated and then we decide what to do with it
// ROUTE 1: first time registering or creating user using /createuser endpoint
router.post('/createuser',[body('email','Enter a valid Email').isEmail(),
    body('password','Enter a password with length more than 5 Characters').isLength({ min: 5 }),
    body('name','Enter a Valid Name').isLength({ min: 3 })],
    async (req,res)=>{
        const errors = validationResult(req);
        // if there are some errors then the response will be the errors itself
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }

    // check wheter there are any errors like not unique mail id
    try {
        let user = await User.findOne({email:req.body.email})
        if (user){    // if user already exists then send the response
            return res.status(400).json({error:"Sorry a user with same email already exists"})
        }
        // we are hasing and salting the entered password
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password,salt)
        // we create an object inside the user model created earlier by taking the value of the req.body
        user = await User.create({
            name: req.body.name,
            password: secpass,
          email: req.body.email
        })
            

          // generating token for every user
          const data = {
              user:{
                  id:user.id
              }
          }
          const authtoken = jwt.sign(data,JWT_SECRET)
        
          res.json({
              authtoken:authtoken
          })   // response if the object has been saved in the model or collections
          
          //.then(user => res.json(user))
          //.catch(err=>{console.log(err)
           // res.json({error:"PLease enter a unique email id",message:err.message})})
        
    } catch (error) {      // try catch statement does something and if it has some error then the catch ststement something something on error 
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

// ROUTE 2 :logging user using /login endpoint
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password Cannot be Blank').isLength({ min: 1 })],
    async (req,res)=>{
        const errors = validationResult(req);
        // if there are some errors then the response will be the errors itself
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).send("Please Login with correct credentials")
        }

        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).send("Please Login with correct credentials")
        }

        // generating token for every user
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
      
        res.json({
            user:{
                id:user.id
            },
            authtoken:authtoken
        })

    } catch (error) {      // try catch statement does something and if it has some error then the catch ststement something something on error 
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

// ROUTE 3 :accepting token and authenticating user using /getuser endpoint
router.post('/getuser',fetchUser,async (req,res)=>{
    try {
        userId = req.user.id
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {      // try catch statement does something and if it has some error then the catch ststement something something on error 
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


module.exports = router