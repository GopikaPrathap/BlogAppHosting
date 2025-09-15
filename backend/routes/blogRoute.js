const express=require('express')
const router=express.Router()
const blogModel=require('../models/blogModel')
const jwt=require('jsonwebtoken')


//Adding middleware
function verifyToken(req,res,next){
    let token=req.headers.token
    try{
        if(!token) throw "Unauthorised Access"
        let payload=jwt.verify(token,"secret")
        if(!payload) throw "Unauthorised Access"
        next()
    }catch(er){
       res.json({message:error})
    }
}

//API methods
router.get('/',async (req,res)=>{
    try{
        const blogs= await blogModel.find()
        res.status(200).send(blogs)
    }catch(er){
        console.error(er)
        res.status(400).send("Can't get all blogs")
    }
})

router.post('/add',verifyToken,async (req,res)=>{
    try{
      const blog= new blogModel(req.body)
      await blog.save()
      res.status(200).send({message:"Successfully added new blog!"})
    }catch(er){
        res.status(400).send("Unable to add new blog")
    }
})

router.put('/update/:id',verifyToken,async (req,res)=>{
    try{
        const id=req.params.id
        const blog= await blogModel.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )
        res.status(200).send({message:"Successfully updated!"})
    }catch(er){
        res.status(400).send("Unable to update the blog")
    }
})



router.delete('/delete/:id',verifyToken,async (req,res)=>{
    try{
       const id=req.params.id
       await blogModel.findByIdAndDelete(id) 
        res.status(200).send({message:"Blog is removed"})

    }catch(er){
        res.status(400).send("Unable to delete")
    }
})

router.get('/get/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const blog= await blogModel.findById(id)
        res.status(200).send(blog)
        console.log("fetched the blog datas")
    }catch(er){
        res.res.status(400).send("Unable to fetch")
    }
})

module.exports=router