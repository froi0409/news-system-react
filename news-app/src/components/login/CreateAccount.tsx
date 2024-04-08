import React, { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Alert, Grid, Link, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import IconButton from '@mui/material/IconButton'
import axios from 'axios';
// @ts-ignore
import { Cookies, useCookies } from 'react-cookie';
import { Route } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

interface State {
    password: string,
    passwordRepeat: string
    showPassword: boolean
    showPasswordRepeat: boolean
}

const CreateAccount = () => {
    
    const [cookies] = useCookies(['jwt']);

    const [username, setUsername] = useState('');
    const [values, setValues] = useState<State>({
        password: '',
        passwordRepeat: '',
        showPassword: false,
        showPasswordRepeat: false
    })
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [phone, setPhone] = useState('');
    
    const [inputType, setInputType] = useState('text')
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(true);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (values.password === values.passwordRepeat) {
                
                const formData = {
                    firstName,
                    lastName,
                    username,
                    password: values.password,
                    email,
                    phone,
                    birthDate
                }

                const response = await axios.post(`http://localhost:4000/v1/user`, formData);

                if (response.status === 201) {
                    setErrorMessage(true);
                    setResponseMessage('Usuario creado con éxito');

                    setFirstName('');
                    setLastName('');
                    setUsername('');
                    values.password = '';
                    values.passwordRepeat = '';
                    setEmail('');
                    setPhone('');
                    setbirthDate('');
                } else {
                    setErrorMessage(false);
                    setResponseMessage('Es posible que el username ingresado ya esté registrado en el sistema');
                }

            }

        } catch (error) {
            console.error(error);
            setErrorMessage(false);
            setResponseMessage('Es posible que el username ingresado ya esté registrado en el sistema');
        }

    }

    const onClickDate = (e: React.FormEvent) => {
        e.preventDefault();
        setInputType('date');
    }

    return (
            <Grid container spacing={5} style={{ marginTop: 20 }}>
                <Grid item xs={1} xl={3} />
                <Grid item xs={10} xl={6}>
                    <Paper elevation={4} style={{ padding: 20 }}>
                        {responseMessage !== '' && errorMessage && (
                        <div>
                                <Alert severity="error">{responseMessage}</Alert>
                        </div>
                        )
                        }
                        {responseMessage !== '' && !errorMessage && (
                            <div>
                                <Alert severity="success">{responseMessage}</Alert>
                            </div>
                        )

                        }
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Typography variant='h4'>
                                        Crear Cuenta
                                    </Typography>                        
                                </Grid>
                                <Grid item xs={12}>
                                <Grid container spacing={5}>
                                        <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Nombre'
                                            placeholder='Ej: Fernando Rubén'
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        </Grid>
                                        <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Apellido'
                                            placeholder='Ej: Ocaña Ixcot'
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label='Usuario'
                                        placeholder='Ej: user001'
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Grid container spacing={5}>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                            <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
                                            <OutlinedInput
                                                label='Contraseña'
                                                value={values.password}
                                                id='auth-login-password'
                                                onChange={handleChange('password')}
                                                sx={{ marginBottom: 4 }}
                                                type={values.showPassword ? 'text' : 'password'}
                                                required
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
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                            <InputLabel htmlFor='password-repeat'>Repetir Contraseña</InputLabel>
                                            <OutlinedInput
                                                label='Repetir Contraseña'
                                                value={values.passwordRepeat}
                                                required
                                                id='password-repeat'
                                                onChange={handleChange('passwordRepeat')}
                                                sx={{ marginBottom: 4 }}
                                                type={values.showPasswordRepeat ? 'text' : 'password'}
                                            />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type='email'
                                    label='Correo Electrónico'
                                    placeholder='carterleonard@gmail.com'
                                    helperText='puedes usar letras, números, puntos y una arroba'
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl fullWidth>
                                <InputLabel htmlFor='birth'>Fecha de Nacimiento</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    value={birthDate}
                                    required
                                    id='birth'
                                    onChange={e => setbirthDate(e.target.value)}
                                    sx={{ marginBottom: 4 }}
                                    onClick={onClickDate}
                                    onFocus={onClickDate}
                                    type={inputType}
                                />
                                </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type='number'
                                    label='Teléfono'
                                    placeholder='Ej: 55555555'
                                    required
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={5}>
                                        <Grid item xs={2}>
                                            <Button onSubmit={handleSubmit} type='submit' variant='contained' size='large' fullWidth>
                                                Crear Usuario
                                            </Button>
                                        </Grid>
                                        <Grid item xs={10}>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={1} xl={3}></Grid>
            </Grid>
        
                        
    )
}

export default CreateAccount;

