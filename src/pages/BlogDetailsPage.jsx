import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import blogService from '../services/blog.service';

export default function BlogDetailsPage() {

    const [blog, setBlog] = React.useState({});

    React.useEffect(() => {
        const id = window.location.pathname.split('/')[2];
        blogService.getBlogById(id).then((res) => {
            setBlog(res?.data);
            console.log(res);
        })
    }, [])

    return (
        <Paper elevation={3} sx={{ margin: '3%', padding: '5%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h4" component="h2">
                        {blog.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="p" component="p" sx={{ color: 'grey' }}>
                        {"By " + blog.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
                        <img src={blog.image} alt={blog.title} style={{ width: '80%', height: '80%', borderRadius: '10px', margin: '0 auto' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="body1" component="p">
                        {blog.content}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>

    )
}
