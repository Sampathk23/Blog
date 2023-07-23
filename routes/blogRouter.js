const express = require("express")
const Blog = require("../models/Blog")

let blogRouter = express.Router()

blogRouter.get("/",async (req,res)=>{
    try {
    let blogs = await Blog.find().sort({"createdAt":-1}).lean()            /*lean() is used to convert json into eson*/
    res.render("home",{blogs})   //here im rendering the blog in home page which is stored in the database entered by user
} catch (error) {
    console.log(error);
}
})

blogRouter.get("/about",(req,res)=>{
    res.render("about")
})

blogRouter.get("/blog",(req,res)=>{
    res.render("blogs")
})

blogRouter.post("/blog",async (req,res)=>{
    console.log(req.body);
    const {title,snippet,body} = req.body
   try {
    await  Blog.create({
        title:title,
        snippet:snippet,
        body:body
    })
    res.redirect("/")
   } catch (error) {
    console.log(error);
   }
})

blogRouter.get("/blog/:id",async (req,res)=>{
   try {
     let id = req.params.id
   let blog = await Blog.findOne({_id:id}).lean()
   res.render("blog",{blog})
   } catch (error) {
    console.log(error);
   }
})

blogRouter.delete("/blog/:id",async(req,res)=>{   //this id we are going to get from url
    try {
        let id =req.params.id
    await Blog.deleteOne({_id:id})
    res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})



module.exports=blogRouter

