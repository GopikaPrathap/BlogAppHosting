import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

const Home = () => {

    const [blogs,setBlogs]=useState([])
    const token=localStorage.getItem('token')
    useEffect(()=>{
        axios.get('/api/blog/')
        // axios.get('http://localhost:5000/blog/')
        .then((res)=>{
            setBlogs(res.data)
        })
        .catch((er)=>{
            console.error(er)
        })
    },[])

//function for deletion
let deleteBlog=(id)=>{
  axiosInstance.delete('/blog/delete/'+id)
  // axiosInstance.delete('http://localhost:5000/blog/delete/'+id)
    .then((res)=>{
      window.location.reload()
    })
    .catch((er)=>{
      console.error(er)
    })
}

//function for updation
let navigate=useNavigate()
let editBlog=(blog)=>{
   navigate('/addblog',{state:{blog}})
}
 
let getMoreInfo=(blog)=>{
  navigate('/more',{state:{blog}})
  console.log(blog)
}

    
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:"30px"}}>
        {blogs.map((blog,index)=>(

<Card sx={{ maxWidth: 345 ,marginTop: 5,display: 'flex',flexDirection: 'column', minHeight: 400,}}>
      <CardMedia
      key={index}
      component="img"
        sx={{ height: 200 }}
        image={blog.image}
        title={blog.title}
        style={{objectFit:'contain',marginTop:"5px"}} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>getMoreInfo(blog)}>Learn More</Button>
        {token &&(
          <>
          <Button size="small" onClick={()=>editBlog(blog)}>Edit</Button>
        <Button size="small" onClick={()=>deleteBlog(blog._id)}>Delete</Button>
          </>
        )}
      </CardActions>
    </Card> 

    ))}
    </div>
  )
}

export default Home

