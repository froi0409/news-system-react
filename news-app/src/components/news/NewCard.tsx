import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const NewCard = (props: any) => {

    const newEntity = props.newEntity;
    
    const addPrefixtToBase64 = (imageData: any) => {
        const type: any = newEntity.imageType;
        if (type) {
            return `data:image/${type.mime};base64,${imageData}`;
        } else {
            console.error(`${newEntity.id} no tiene una imagen válida`);
            return null;
        }
    }

    const prefixedImage: any = addPrefixtToBase64(newEntity.imagePath);
    console.log(prefixedImage);

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={prefixedImage}
                    title="green iguana"
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
                    <Button size="small">Leer más...</Button>
                </CardActions>
            </Card>
            
        </>
    );
}

export default NewCard;

