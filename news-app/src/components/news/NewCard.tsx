import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

const NewCard = (props: any) => {

    const navigate = useNavigate();

    const newEntity = props.newEntity;
    
    const addPrefixtToBase64 = (imageData: any) => {
        const type: any = newEntity.imageType;
        if (type) {
            return `data:image/${type};base64,${imageData}`;
        } else {
            console.error(`${newEntity.id} no tiene una imagen válida`);
            return null;
        }
    }

    const handleOnClick = () => { 
        navigate(`/newComplete/${newEntity._id}`);
    }

    const prefixedImage: any = addPrefixtToBase64(newEntity.imagePath);
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={prefixedImage}
                    title="new image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {newEntity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {newEntity.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleOnClick} size="small">Leer más...</Button>
                </CardActions>
            </Card>
            
        </>
    );
}

export default NewCard;

