import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

export default function BlogListItem({ blog }) {
    console.log(blog);
    return (
        <Paper elevation={3} sx={{ margin: '3%', padding: '5%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '60%'}}>
                        <Typography variant="h5" component="h2" noWrap>
                            {blog.title}
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color: 'grey' }}>
                            {"By " + blog.name}
                        </Typography>
                        <Typography variant="body2" component="p"  sx={{ marginTop: '10px', wordWrap:'break-word'}}>
                            {blog.content.substring(0, 200) + '...'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} sx={{ width: '100%', textAlign: 'right' }}>
                        <Button variant="contained"
                            color="success"
                            sx={{ marginTop: '3%' }}
                            startIcon={<ReadMoreIcon />}
                            href={`/blogs/${blog.id}`}>
                            Read More
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
    )
}
