import React, { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import { Alert, Grid, Link } from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import axios from 'axios';
// @ts-ignore
import { useCookies } from 'react-cookie';
import { Route } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


interface State {
    password: string
    showPassword: boolean
  }

const LoginForm = () => {

    const navigate = useNavigate();

    const [ cookies, setCookie ] = useCookies([ 'jwt' ]);

    const [username, setUsername] = useState('');
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })
    const [responseMessage, setResponseMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            username,
            password: values.password
        }

        try {
            const response = await axios.post(`http://localhost:4000/v1/user/login`, formData);
            console.log(response);
            setSubmitted(true);

            if (response.status === 200) {
                const token = response.data.token;
                setCookie('jwt', `Bearer ${token}`);

                navigate('/index');
            } else {
                setResponseMessage('Ocurrió un error al iniciar sesión');
            }
        } catch (error: any) {
            console.error(error);
            setSubmitted(true);
            if (error.response) {
                setResponseMessage('Usuario o contraseña incorrecta, verifica tus credenciales');    
            }
            setResponseMessage('Ocurrió un error al iniciar sesión');
            
        }

    }

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
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
                        <Alert severity="error">{responseMessage}</Alert>    
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
                        NewsSystem
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                        Bienvenido a NewsSystem!
                        </Typography>
                        <Typography variant='body2'>Ingresa tus credenciales para iniciar sesión</Typography>
                    </Box>
                    <form noValidate onSubmit={handleSubmit} autoComplete='off'>
                        <TextField
                        autoFocus 
                        fullWidth 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id='username' 
                        label='Usuario' 
                        sx={{ marginBottom: 4 }} 
                        />
                        <FormControl fullWidth>
                        <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
                        <OutlinedInput
                            label='Password'
                            value={values.password}
                            id='auth-login-password'
                            onChange={handleChange('password')}
                            sx={{ marginBottom: 4 }}
                            type={values.showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                aria-label='toggle password visibility'
                                >
                                {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
                        <Box
                        sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                        >
                        </Box>
                        <Button
                        fullWidth
                        type='submit'
                        size='large'
                        variant='contained'
                        sx={{ marginBottom: 7 }}
                        >
                        Iniciar Sesión
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2' sx={{ marginRight: 2 }}>
                            ¿Eres nuevo?
                        </Typography>
                        <Typography variant='body2'>
                            <Link color="inherit" href='/pages/register'>
                                Crear una cuenta
                            </Link>
                        </Typography>
                        </Box>
                        
                    </form>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
            <Grid item xs={1} xl={3}></Grid>
        </Grid>
    )
}

export default LoginForm;
