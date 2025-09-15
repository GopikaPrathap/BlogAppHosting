import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../axiosinterceptor'

const Addblog = () => {

  const [form,setForm]=useState({
    title:'',
    description:'',
    image:''
  })

    //to trcak the current location,use useLocation()
let location=useLocation()
  useEffect(()=>{
    if(location.state!=null){
      setForm({...form,
        title:location.state.blog.title,
        description:location.state.blog.description,
        image:location.state.blog.image
      })
    }

  },[])

  const navigate=useNavigate()

  function submitValue(e){
   
    if(location.state!=null){
      // axiosInstance.put('http://localhost:5000/blog/update/'+location.state.blog._id,form)
      axiosInstance.put('/api/blog/update/'+location.state.blog._id,form)
      .then((res)=>{
        alert("Blog Updated")
        navigate('/')
      })
      .catch((er)=>{
        alert("Failed to update")
        console.error(er)
      })
    }else{
       e.preventDefault()
      axiosInstance.post('/api/blog/add',form)
      // axiosInstance.post('http://localhost:5000/blog/add',form)
    .then((res)=>{
      console.log("new blog added",form)
      alert(res.data.message)
      navigate('/')
    })
    .catch((er)=>{
        console.error(er)
        alert("Failed to add blog")
        navigate('/addblog')
      })
    }
    
  }


  

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{textAlign:'center',marginTop:'100px',width:'500px'}}>
       
        <h2>Blog</h2>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '40ch',} }}
      noValidate
      autoComplete="off"
    >
      <TextField id="title" label="Title" variant="standard" name='title' value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/><br />
      <TextField id="description" label="Description" variant="standard" value={form.description} name='description' onChange={(e)=>setForm({...form,description:e.target.value})}/><br />
      <TextField id="image" label="Image URL" variant="standard" name='image' value={form.image}  onChange={(e)=>setForm({...form,image:e.target.value})}/><br />
      <Button variant="contained" style={{width:'100px',backgroundColor:'purple',color:'lavender'}} onClick={submitValue}>Add</Button>
      
    </Box>

    </div>
    </div>
  )
}

export default Addblog
