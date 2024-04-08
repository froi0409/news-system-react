import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AllNews from './AllNews';

interface NewInfo {
    id: string,
    title: string,
    description: string,
    body: string,
    author: string,
    publishDate: Date,
    categories: Array<String>


}

const NewCard = (props: any) => {

    const newEntity = props.newEntity;
    
    console.log(newEntity);

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={newEntity.imagePath}
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

