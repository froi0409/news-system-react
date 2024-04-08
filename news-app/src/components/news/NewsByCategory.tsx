import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const NewsByCategory = () => {
    
    return (
        <Grid container spacing={5}>
            <Grid item xs={1} xl={3}></Grid>
            <Grid item xs={10} xl={6}>
                <Paper elevation={4} style={{ padding: 20, marginTop: 20 }}>
                    <h1>Hello Wrodl</h1>
                </Paper>
            </Grid>
            <Grid item xs={1} xl={3}></Grid>
        </Grid>
    );
}

export default NewsByCategory;
