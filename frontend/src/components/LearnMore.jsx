import React from 'react'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Card } from '@mui/material';
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


const LearnMore = () => {

     const [blog,setBlog]=useState({
         title:'',
         description:'',
         image:'',
         extrainfo:''
       })

           //to trcak the current location,use useLocation()
let location=useLocation()
  useEffect(()=>{
    if(location.state!=null){
      setBlog({...blog,
        title:location.state.blog.title,
        description:location.state.blog.description,
        image:location.state.blog.image,
        extrainfo:location.state.blog.extrainfo
      })
    }

  },[])

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

<Card sx={{ maxWidth: 600 ,marginTop: 5,display: 'flex',flexDirection: 'column', minHeight: 400,}}>
      <CardMedia
      component="img"
        sx={{ height: 300 }}
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {blog.extrainfo}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to='/'><Button size="small">Go Back</Button></Link>
      </CardActions>
    </Card> 
    </div>
  )
}

export default LearnMore
