import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token=localStorage.getItem('token')
  const navigate=useNavigate()
  
  const removeToken=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'lavender'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 , color:'purple'}}>
           <strong><i>BlogApp</i></strong>
          </Typography>
          {!token &&(
         <Link to='/login'><Button color="inherit" sx={{color:'purple'}}>Login</Button></Link>
         )}
         {token &&(
          <>
          <Link to='/addblog'><Button color="inherit" sx={{color:'purple'}}>Add Blog</Button></Link>
          <Button color="inherit" sx={{color:'purple'}} onClick={removeToken}>LogOut</Button>
          </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar

