import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NewCard from "./NewCard";



const CategoryNews = (props: any) => {

    const idMain = props.idMain;
    let category = props.category;
    if (category instanceof Array) {
        category = category[0]
    }

    const [news, setNews] = useState([]);
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        axios.get(`http://localhost:4000/v1/new/getByCategory/${category}/${idMain}`, {
            headers: {
                Authorization: cookies.jwt
            }
        })
        .then(response => setNews(response.data))
        .catch(error => console.error(error));

    }, []);

    return (
        <Grid style={{ marginBottom: 5 }} container spacing={5}>
            {news.map((newEntity:any) => (
                <Grid item xs={12} md={6} xl={4}>
                    <NewCard newEntity={newEntity} />
                </Grid>
            ))  
            }
        </Grid>
    )
}

export default CategoryNews;
