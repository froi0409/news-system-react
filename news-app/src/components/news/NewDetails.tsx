import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CategoryNews from "./CategoryNews";

export const NewDetails = (props: any) => {
    
    const [cookies] = useCookies(['jwt']);
    const [newDetails, setNewDetails] = useState(null) as any;
    const [category, setCategory] = useState('')
    const [textWithBreaks, setTextWithBreaks] = useState('')

    const [prefixedImage, setPrefixedImage] = useState('');
    const { id } = useParams();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/v1/new/getById/${id}`, {
                    headers: {
                        Authorization: cookies.jwt
                    }
                });
                
                setNewDetails(response.data);
                
                if (response.data.imageType) {
                    const type = response.data.imageType;
                    setPrefixedImage(`data:image/${type};base64,${response.data.imagePath}`);
                    console.log(prefixedImage);
                }

                if (response.data.categories instanceof Array) {
                    setCategory(response.data.categories[0])
                } else {
                    setCategory(response.data.categories)
                }

                if (response.data.body) {
                    setTextWithBreaks(response.data.body.replace(/\n/g, '<br>'));
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [ id ]);

    return (
        <Grid container spacing={5}>
            <Grid item xs={1} xl={3} />
            <Grid item xs={10} xl={6}>
            <Button href='/index' variant="contained" style={{ backgroundColor: '#8d7966', marginTop: 20 }}>
                VOLVER
            </Button>
            </Grid>
            <Grid item xs={1} xl={3} />
            <Grid item xs={1} xl={3}></Grid>
            <Grid item xs={10} xl={6}>
                <Paper elevation={4} style={{ padding: 20, marginTop: 20 }}>
                    {newDetails ? (
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardMedia
                                        sx={{ height: 300 }}
                                        image={prefixedImage}
                                        title=""
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                variant='h4'
                                >
                                {newDetails.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6'>
                                    Por: {newDetails.author}
                                </Typography>
                                <Typography variant='h6'>
                                    Fecha: {newDetails.publishDate.split('T')[0]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: textWithBreaks }} />
                            </Grid>
                        </Grid>
                    ) : (
                        <h1>Obteniendo información</h1>
                    )
                    }
                </ Paper>
            </Grid>
            <Grid item xs={1} xl={3}></Grid>

            <Grid item xs={1} xl={3}></Grid>
            <Grid item xs={10} xl={6}>
                {category !== '' && (
                <Grid>
                    <Typography variant='h6'>
                        También te Recomendamos:
                    </Typography>
                    <CategoryNews idMain={id} category={category} />
                </Grid>
                )

                }
            </Grid>
            <Grid item xs={1} xl={3}></Grid>
            
        </Grid>
    )
}

export default NewDetails;
