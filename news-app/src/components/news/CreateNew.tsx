import { Divider, Grid, Input, TextField, MenuItem, Select, InputLabel, Alert } from "@mui/material";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Textarea } from './utils'

import { styled } from '@mui/system';

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateNew = () => {

    const [cookies] = useCookies(['jwt']);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [errorResponse, setErrorResponse] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');

    const handleStatusChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedCategory(event.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            const bodyWithNewlines = body.replace(/\n/g, '<br>')

            const formData = new FormData();
            // @ts-ignore
            formData.append('image', selectedFile);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('body', bodyWithNewlines);
            formData.append('categories', selectedCategory);
            formData.append('categories', 'todo');

            const response = await axios.post('http://localhost:4000/v1/new/', formData, {
                headers: {
                    Authorization: cookies.jwt
                }
            });

            if (response.status === 201) {
                setErrorResponse(false);
                setResponseMessage('Noticia creada con éxito');

                setTitle('');
                setDescription('')
                setSelectedFile(null);
                setBody('');
                setSelectedCategory('');
            } else {
                setErrorResponse(true);
                setResponseMessage('Ocurrió un error al crear la noticia')
            }

        } catch (error) {
            console.error(error);
            setErrorResponse(true);
            setResponseMessage('Ocurrió un error al crear la noticia')
        }
    }

    

    return (
        <Grid container spacing={5} style={{ marginTop: 20 }}>
            <Grid item xs={1} xl={3} />
            <Grid item xs={10} xl={6}>
                <Paper elevation={4} style={{ padding: 20 }}>
                    {responseMessage !== '' && errorResponse && (
                       <div>
                            <Alert severity="error">{responseMessage}</Alert>
                       </div>
                    )
                    }
                    {responseMessage !== '' && !errorResponse && (
                        <div>
                            <Alert severity="success">{responseMessage}</Alert>
                        </div>
                    )

                    }
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'>
                                    Creación de Noticia
                                </Typography>                        
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Titulo de la Noticia'
                                    placeholder='Titulo'
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Descripción de la Noticia'
                                    placeholder='Descripción'
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {selectedFile && <InputLabel>Archivo: {selectedFile.name}</InputLabel>}
                                <Button
                                    fullWidth
                                    component="label"
                                    style={{ backgroundColor: '#8d7966' }}
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                Subir Imagen
                                <VisuallyHiddenInput type="file" accept="image/png, image/jpeg, image/jpg" required onChange={handleFileChange} />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Textarea required style={{ borderStyle: 'none', width: '100%' }} value={body} onChange={(e) => setBody(e.target.value)} aria-label="minimum height" minRows={3} placeholder="Cuerpo de la noticia" />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={5} alignItems='center'>
                                    <Grid item xs={6}>
                                        <InputLabel id="category">Categoria</InputLabel>
                                        <Select
                                            required
                                            fullWidth
                                            label="Categoria"
                                            value={selectedCategory}
                                            onChange={handleStatusChange}
                                            id="category"
                                            labelId="category"
                                        >
                                            <MenuItem value="ciencia">ciencia</MenuItem>
                                            <MenuItem value="futbol">futbol</MenuItem>
                                            <MenuItem value="nacional">nacional</MenuItem>
                                            <MenuItem value="tecnologia">tecnologia</MenuItem>
                                            <MenuItem value="otro">otro</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="contained" style={{ backgroundColor: '#8d7966', marginTop: 20 }}>
                                            Crear Noticia
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={1} xl={3} />
        </Grid>
    )
}

export default CreateNew;