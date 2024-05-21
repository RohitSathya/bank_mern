import React, { useState } from 'react'
import { Container, TextField, Button, Grid,InputAdornment, IconButton } from '@mui/material';
import axios from 'axios'
import { Select, MenuItem } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function register() {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [email,setemail]=useState('')
    const [address,setaddress]=useState('')
    const [phoneno,setphoneno]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [depositType, setDepositType] = useState('fd');
    const navigate=useNavigate()
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

    async function sub(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const check=emailRegex.test(email)
        if(check){
            const response=await axios.post('http://localhost:5000/api/auth/register',{username:username,email:email,password:password,address:address,phone:phoneno,depositType:depositType})
            const {message}=response.data
            if(message=='s'){
                navigate('/login')
    
            }
            else{
                toast.warn('User Already exists')
    
            }

        }
        else{
            toast.warn('Wrong Email Format')
        }
      
    }

  return (
    <>
       <ToastContainer />
      <Container maxWidth="sm">
      <div style={{ marginTop: '100px' }}>
        <h2>Registration</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" variant="outlined" value={username} onChange={(e)=>setusername(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <>Hide</> : <>Show</>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
              <TextField fullWidth label="Address" variant="outlined" value={address} onChange={(e)=>setaddress(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="PhoneNo" variant="outlined" value={phoneno} onChange={(e)=>setphoneno(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
    <Select
        fullWidth
        label="Deposit Type"
        variant="outlined"
        value={depositType}
        
        onChange={(e) => setDepositType(e.target.value)}
    >
        <MenuItem value="fd">Fixed Deposit</MenuItem>
        <MenuItem value="rd">Repository Deposit</MenuItem>
    </Select>
</Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={sub}>
                Register
              </Button>
              <Button variant="contained" color="primary" fullWidth onClick={()=>navigate('/login')} style={{marginTop:'10px'}}>
                Already Registered ?  Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  )
}
