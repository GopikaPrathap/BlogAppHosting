import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [form,setForm]=useState({
    email:'',
    password:''
  })

  const navigate=useNavigate()
  
  function checkValue(e){
    e.preventDefault()
    // axios.post('http://localhost:5000/user/login',form)
    axios.post('/api/user/login',form)
    .then((res)=>{
      console.log("form submitted...",form)
      alert(res.data.message)
      if(res.data.usertoken){
        localStorage.setItem("token",res.data.usertoken)
          navigate('/')
      }
      
    })
    .catch((er)=>{
        console.error(er)
        alert("Invalid Login Credential")
        navigate('/')
      })
  }

  return (
   <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{textAlign:'center',marginTop:'100px',width:'500px'}}>
       
        <h2>User Login</h2>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '40ch',} }}
      noValidate
      autoComplete="off"
    >
      <TextField id="email" label="Email" variant="standard" name='email' value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/><br />
      <TextField id="password" label="Password" variant="standard" name='password' value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/><br />
      <Button variant="contained" style={{width:'100px',backgroundColor:'purple',color:'lavender'}} onClick={checkValue}>Login</Button>
      
    </Box>

    </div>
    </div>
  )
}

export default Login
