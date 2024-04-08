
import React, { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Alert, Grid, Link } from '@mui/material'

import axios from 'axios';
// @ts-ignore
import { useCookies } from 'react-cookie';
import { Route } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [responseMessage, setResponseMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState('')

    const handleSubmit = async () => {
        try {

            const formData = {
                username
            }

            const response = await axios.post(`http://localhost:4000/v1/user/forgotMyPassword`, formData);

            console.log(response.data);

            setSubmitted(true);
            setResponseMessage('Si el usuario se encuentra en el sistema, se ha enviado un enlace a tu correo asociado.');
            
        } catch (error) {
            console.error(error);
            setSubmitted(true);
            setResponseMessage('Si el usuario se encuentra en el sistema, se ha enviado un enlace a tu correo asociado.');
        }
    }

    return (
        <Grid margin={5} container>
            <Grid item xs={1} xl={3}>
                <img src="" alt="" />
            </Grid>
            <Grid item xs={10} xl={6}>
            <Box className='content-center'>
                    <Card sx={{ zIndex: 1 }}>
                    <Grid>
                    {submitted && responseMessage !== '' && (
                        <Alert severity="success">{responseMessage}</Alert>    
                    )
                    }
                    </Grid>
                    <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
                    <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography
                        variant='h6'
                        sx={{
                            ml: 3,
                            lineHeight: 1,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '1.5rem !important'
                        }}
                        >
                        Restablecer Contraseña
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                        Bienvenido a NewsSystem!
                        </Typography>
                        <Typography variant='body2'>Ingresa tus usuario</Typography>
                    </Box>
                        <TextField
                        autoFocus 
                        fullWidth 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id='username' 
                        label='Usuario' 
                        sx={{ marginBottom: 4 }} 
                        />
                        
                        <Button
                        fullWidth
                        type='submit'
                        size='large'
                        variant='contained'
                        sx={{ marginBottom: 7 }}
                        onClick={handleSubmit}
                        >
                        Restablecer Contraseña
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2'>
                            <Link color="inherit" href='/'>
                                Volver a Inicio de Sesión
                            </Link>
                        </Typography>
                        </Box>
                        
                    </CardContent>
                </Card>
                </Box>
            </Grid>
            <Grid item xs={1} xl={3}></Grid>
        </Grid>
    )
}

export default ForgotPassword;
