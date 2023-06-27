import { CssBaseline, Divider, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import BlogForm from './BlogForm'

export default function AnnouncementCreatePage() {
  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" gutterBottom>
                Create Blog
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <BlogForm />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  )
}
