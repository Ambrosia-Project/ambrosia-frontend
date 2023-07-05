import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import HelperIcon from "../../components/HelpIcon";
import orderService from "../../services/order.service";
import OrderCard from "./OrderCard";

function AllOrders() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const init = useCallback(async () => {
    setLoading(true);
    const res = await orderService.getAllOrders();
    console.log(res);
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            paddingRight={2}
          >
            <HelperIcon text="You can see the all the orders below. Choose one of the client to proceed to see details." />
          </Box>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                  fontFamily: "Lavonia",
                  fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                  fontStyle: "italic",
                  color: "#5E9459",
                }}
              >
                Customers' Orders
              </Typography>
              <Divider
                sx={{ width: { xs: "20%", md: "30%" }, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: 0, my: 0 }}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress
                    style={{ color: "#999", justifyContent: "center" }}
                  />
                </div>
              ) : data.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                  No menu items found
                </Typography>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  {data.map((orderItem) => (
                    <Grid
                      item
                      key={orderItem.userId}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                    >
                      <OrderCard orderItem={orderItem} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}

export default AllOrders;
