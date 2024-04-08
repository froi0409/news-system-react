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
import { Route, useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

interface State {
    password: string,
    passwordRepeat: string
    showPassword: boolean
    showPasswordRepeat: boolean
}

const ResetPassword = () => {
    
    const navigate = useNavigate();

    const [ cookies, setCookie ] = useCookies([ 'jwt' ]);

    const { username, token } = useParams();

    const [usernameFinal, setUsernameFinal] = useState('');
    const [tokenFinal, setTokenFinal] = useState('');
    const [values, setValues] = useState<State>({
        password: '',
        passwordRepeat: '',
        showPassword: false,
        showPasswordRepeat: false
    })

    const [responseMessage, setResponseMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorResponse, setErrorResponse] = useState(true);



    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleClickShowPasswordRepeat = () => {
        setValues({ ...values, showPassword: !values.showPasswordRepeat })
    }

    const handleSubmit = async () => {
        if (values.password === values.passwordRepeat) {
            try {
                const formData = {
                    username,
                    token,
                    newPassword: values.password
                }

                const response = await axios.put(`http://localhost:4000/v1/user/updatePasswordToken`, formData);
                
                setSubmitted(true);
                
                if (response.status === 201) {
                    setErrorResponse(false);
                    setResponseMessage('La contraseña ha sido actualizada con éxito');    
                    console.log('contraseña actualizada con éxito');
                } else {
                    setErrorResponse(true);
                    setResponseMessage('Ocurrió un error al intentar actualizar la contraseña');    
                    
                }
            } catch (error) {
                console.error(error);
                setErrorResponse(true);
                setResponseMessage('Ocurrió un error al intentar actualizar la contraseña');    
                    
            }
        } else {
            setErrorResponse(true);
            setSubmitted(true);
            setResponseMessage('Las contraseñas deben de coincidir')
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
                    {submitted && !errorResponse && responseMessage !== '' && (
                        <Alert severity="success">{responseMessage}</Alert>    
                    )
                    }
                    {submitted && errorResponse && responseMessage !== '' && (
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
                        Restablecer Contraseña
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                        Bienvenido a NewsSystem!
                        </Typography>
                        <Typography variant='body2'>Ingresa las contraseñas (deben coincidir)</Typography>
                    </Box>
                        
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
                        <FormControl fullWidth>
                        <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
                        <OutlinedInput
                            label='Password'
                            value={values.passwordRepeat}
                            id='auth-login-password'
                            onChange={handleChange('passwordRepeat')}
                            sx={{ marginBottom: 4 }}
                            type={values.showPasswordRepeat ? 'text' : 'password'}
                            
                        />
                        </FormControl>
                        <Button
                        fullWidth
                        type='submit'
                        size='large'
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{ marginBottom: 7 }}
                        >
                        Restablecer Contraseña
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2'>
                            <Link color="inherit" href='/'>
                                Regresar a Inicio de Sesion
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

export default ResetPassword;