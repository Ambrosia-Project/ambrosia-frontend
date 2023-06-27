import { Button, Container, CssBaseline, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import spagetthi from '../assets/images/spagetthi.jpg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';

export default function Dashboard() {
  return (
    <CssBaseline>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ margin: '5% 7%', }}>
          <Grid container spacing={2} sx={{ padding: '3% 7%' }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" component="div" sx={{ margin: '10px 0' }}>
                Chief's Advice
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={spagetthi} alt='food' style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginBottom: '20px' }}>
                Spagetthi Bolognese
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                voluptatum, voluptate, quibusdam, quia voluptas quos dolorum
                voluptatibus quod quas quidem voluptatem? Quisquam voluptatum,
                voluptate, quibusdam, quia voluptas quos dolorum voluptatibus quod
                quas quidem voluptatem? Quisquam voluptatum, voluptate, quibusdam,
                quia voluptas quos dolorum voluptatibus quod quas quidem
              </Typography>
              <Button variant="contained" color='success' endIcon={<SendIcon />} sx={{ marginTop: '20px'}}>See Details</Button>
            </Grid>
          </Grid>
        </Paper>


        <Grid container spacing={2} sx={{ padding: '1% 7%' }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ padding: '3% 7%', height: '100%' }}>

              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <StarIcon sx={{color: 'yellow'}}/> Most Popular
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
              <Grid container spacing={2} sx={{ padding: '3% 7%' }}>
                <Grid item xs={12} md={6}>
                  <img src={spagetthi} alt='food' style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginBottom: '20px' }}>
                    Spagetthi Bolognese
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                    voluptatum, voluptate, quibusdam, quia voluptas quos dolorum
                    voluptatibus quod quas quidem voluptatem? Quisquam voluptatum,
                  </Typography>
                  <Button variant="contained" color='success' endIcon={<ShoppingCartIcon />} sx={{ marginTop: '20px'}}>Order Now</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ padding: '3% 7%' }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Recently Ordered
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
              <Grid container spacing={2} sx={{ padding: '3% 7% 3% 0' }}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Spagetthi Bolognese
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                    Amount: 2
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                    Price: 25 $
                  </Typography>
                  <Button variant="contained" color='success' endIcon={<ShoppingCartIcon />} sx={{ marginTop: '20px'}}>Order Again</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  )
}
