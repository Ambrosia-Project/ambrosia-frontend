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
import salad from '../assets/images/vegan.jpg'
import orderService from '../services/order.service'

export default function Dashboard() {

  const [orders, setOrders] = React.useState([]);

  const handleAddToCart = () => {
    orderService.addToCart(1, 12).then((res) => {
      console.log(res)
      window.location.reload();
    }).catch((err) => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    orderService.getOrders(user.email).then((res) => {
      console.log(res)
      setOrders(res?.data.content ? res.data.content : [])
      console.log(orders)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <CssBaseline>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ margin: "5% 7%" }}>
          <Grid
            container
            spacing={2}
            sx={{ padding: "2% 7%", maxHeight: "1200px" }}
          >
            <Grid item xs={12} md={12}>
              <Box style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <img src={chef} alt='chef' style={{ width: '80px', height: '80px', borderRadius: '10px' }} />
                <Typography variant="h4" component="div" >
                  Chief's Advice
                </Typography>
              </Box>
              <Divider sx={{ margin: "10px 0" }} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Carousel sx={{ margin: "0 5%" }}>
                <img
                  src={caesar}
                  alt="food"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
                <img
                  src={cake}
                  alt="food"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
                <img
                  src={calamari}
                  alt="food"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              </Carousel>
            </Grid>
          </Grid>
        </Paper>

        {/* // most popular */}
        <Grid container spacing={2} sx={{ padding: '1% 7%' }}>
          <Grid item xs={12} md={7}>
            <Paper elevation={1} sx={{ padding: '3% 7%', height: '100%' }}>

              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <StarIcon sx={{ color: "yellow" }} /> Most Popular
              </Typography>
              <Divider sx={{ margin: "10px 0" }} />
              <Grid container spacing={2} sx={{ padding: "3% 7%" }}>
                <Grid item xs={12} md={6}>
                  <img
                    src={salad}
                    alt="food"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, marginBottom: "20px" }}
                  >
                    House Salad
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    At the top of our list of vegan salad recipes: House salad! This House salad is all about contrasts in color, flavor, and texture...

                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<ShoppingCartIcon />}
                    sx={{ marginTop: "20px" }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* // meals in the order */}
          <Grid item xs={12} md={5}>
            <Paper elevation={1} sx={{ padding: '3% 7%' }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingTop: '3%' }}>
                <ShoppingCartIcon sx={{ color: "#000" }} /> Active Orders
              </Typography>
              <Divider sx={{ margin: '10px 0' }} />
              {orders.length === 0 && <Typography variant="body1" component="div" sx={{ flexGrow: 1, paddingTop: '3%' }}>
                You have no active orders.
              </Typography>}

              {orders.length !== 0 && <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>

                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Meal</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {orders.map((row) => (
                      <TableRow
                        key={row.menu.meal_name}
                      >
                        <TableCell align="center" sx={{ borderBottom: '0' }}>{row.menu.meal_name}</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0' }}><div style={{ background: '#E7B10A', padding: '1px 10px', borderRadius: '10px', textAlign: 'center' }}><p style={{ color: '#fff' }}>Preparing</p></div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
}

