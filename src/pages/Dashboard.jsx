import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StarIcon from '@mui/icons-material/Star'
import { Box, Button, Container, CssBaseline, Divider, Grid, Paper, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import Carousel from 'react-material-ui-carousel'
import caesar from '../assets/images/caesar.png'
import cake from '../assets/images/cake.png'
import calamari from '../assets/images/calamari.png'
import chef from '../assets/images/chef.png'
import spagetthi from '../assets/images/spagetthi.jpg'

export default function Dashboard() {

  return (
    <CssBaseline>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ margin: '5% 7%', }}>
          <Grid container spacing={2} sx={{ padding: '2% 7%', maxHeight: '1200px' }}>
            <Grid item xs={12} md={12}>
              <Box style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <img src={chef} alt='chef' style={{ width: '80px', height: '80px', borderRadius: '10px' }} />
                <Typography variant="h4" component="div" >
                  Chief's Advice
                </Typography>
              </Box>
              <Divider sx={{ margin: '10px 0' }} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Carousel sx={{ margin: '0 5%' }}>
                <img src={caesar} alt='food' style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                <img src={cake} alt='food' style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                <img src={calamari} alt='food' style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
              </Carousel>
            </Grid>
          </Grid>
        </Paper>

        {/* // most popular */}
        <Grid container spacing={2} sx={{ padding: '1% 7%' }}>
          <Grid item xs={12} md={7}>
            <Paper elevation={1} sx={{ padding: '3% 7%', height: '100%' }}>

              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <StarIcon sx={{ color: 'yellow' }} /> Most Popular
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
                  <Button variant="contained" color='success' endIcon={<ShoppingCartIcon />} sx={{ marginTop: '20px' }}>Order Now</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* // meals in the order */}
          <Grid item xs={12} md={5}>
            <Paper elevation={1} sx={{ padding: '3% 7%' }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingTop: '3%' }}>
                Meals In The Order
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Order Number</TableCell>
                      <TableCell align="center">Meal</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Price($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='center'>{row.id}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center"><div style={{background: '#E7B10A', padding:'1px 10px', borderRadius:'10px', textAlign:'center'}}><p style={{color:'#fff'}}>preparing</p></div></TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  )
}

const rows = [
  {
    id: '1',
    name: 'Spagetthi Bolognese',
    price: 10.0,
  },
  {
    id: '2',
    name: 'Spagetthi Bolognese',
    price: 10.0,
  },
]
