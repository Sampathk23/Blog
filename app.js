if(process.env.NODE_ENV!=="production"){
 require("dotenv").config() //THIS IS SOLELY FOR THE DEVELOPMENT PURPOSE
}
/*By using this code, the application checks if it is not running in a production environment. If it is not in production, it loads the configuration variables
from a .env file. This is useful for keeping sensitive information (such as database credentials or API keys) separate from the codebase and storing them in a local
.env file during development or testing*/

const express =require("express")
const mongoose = require("mongoose")     //require is a function in Node.js used to import modules. It is used here to import the "mongoose" module. By importing the Mongoose library, you can use its various features and functionalities to interact with MongoDB databases in your Node.js application.
const blogRouter = require("./routes/blogRouter")
const methodOverride = require('method-override')
let app = express()

//This code tells Express to serve static files from the 'public' folder.
app.use(express.static('public'));


app.use(methodOverride("_method"))

//register template engine
app.set("view engine","ejs")

//mongodb connection
async function db(){
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected");
}
db()

//to get body, this is an inbuilt middleware
app.use(express.urlencoded({extended:false}))



//route middleware
app.use(blogRouter)

// if it does not reach any path then it will access this middleware  error page middleware
app.use((req,res)=>{
    res.render("404")
})

app.listen(process.env.PORT,(err)=>{
   if(err) console.log(err);
   console.log(`server is running on port ${process.env.PORT}`);
})