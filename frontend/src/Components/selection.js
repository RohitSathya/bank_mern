import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material'; // Importing icons for buttons

export default function Selection() {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: '10px 0',
        padding: '10px 20px', // Adjust button padding for smaller size
        borderRadius: '20px', // Rounded corners for buttons
    };

    return (
        <Container maxWidth="sm" style={{ height: '100vh' }} >
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12} style={{marginTop:'100px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={buttonStyle} // Applying button styles
                        onClick={() => navigate('/register')}
                        startIcon={<AccountCircle />} // Adding icon to button
                    >
                        Register as User
                    </Button>
                </Grid>
                <Grid item xs={12} style={{marginTop:'-500px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={buttonStyle} // Applying button styles
                        onClick={() => navigate('/login')}
                        startIcon={<ExitToApp />} // Adding icon to button
                    >
                        Login as User
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
