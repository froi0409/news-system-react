import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Alert, Grid, Link } from '@mui/material'
import NewCard from "./NewCard";

const AllNews = () => { 
    const [news, setNews] = useState([]);
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        axios.get(`http://localhost:4000/v1/new/getAll`, {
            headers: {
                Authorization: cookies.jwt
            }
        })
        .then(response => setNews(response.data))
        .catch(error => console.error(error));

    }, []);

    return (
        <Grid style={{ padding: 25 }} container spacing={5}>
            {news.map((newEntity:any) => (
                <Grid item xs={12} md={6} xl={3}>
                    <NewCard newEntity={newEntity} />
                </Grid>
            ))  
            }
        </Grid>
    )
}

export default AllNews; 
