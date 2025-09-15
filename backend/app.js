const express=require('express')
const app=express()
require('dotenv').config()
const PORT=process.env.PORT
const cors=require('cors')
const jwt=require('jsonwebtoken')

const blogModel=require('./models/blogModel')
const userModel=require('./models/userModel')
const blogRoute=require('./routes/blogRoute')
const userRoute=require('./routes/userRoute')
const connectDB=require('./connection')

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/blog',blogRoute)
app.use('/user',userRoute)

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})