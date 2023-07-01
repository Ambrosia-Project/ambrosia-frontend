import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import OrderTable from "./OrderTable";
import HelperIcon from "../../components/HelpIcon";
import { makeStyles } from "@mui/styles";
import orderService from "../../services/order.service";
import CustomSnackbar from "../../components/Snackbar";

const useStyles = makeStyles((theme) => ({
  menuName: {
    fontFamily: "Poppins",
    fontWeight: "lighter",
    fontSize: "2rem",
    color: "#EEBA2B",
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  columnHeader: {
    fontFamily: "Poppins",
    fontWeight: "lighter",
    color: "#6a9f6f",
  },
  mealImage: {
    width: 80,
    height: 80,
    marginRight: theme.spacing(0.5),
    objectFit: "cover",
  },
  mealName: {
    fontWeight: "bold",
  },
  mealType: {
    color: theme.palette.text.secondary,
  },
  extraType: {
    color: theme.palette.text.secondary,
  },
  quantityContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  quantityButton: {
    padding: 0,
    minWidth: "auto",
  },
  quantityText: {
    margin: `0 ${theme.spacing(2)}px`,
    textAlign: "right",
  },
  priceColumn: {
    fontFamily: "Poppins",
    fontWeight: "lighter",
    color: "#6a9f6f",
  },
  orderButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  orderButton: {
    backgroundColor: "#5E714E",
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#4B5C3F",
    },
  },
  totalPriceLabel: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#6a9f6f",
  },
  totalPriceValue: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#EEBA2B",
  },
  orderNumber: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: "1rem",
    color: "#EEBA2B",
    marginTop: theme.spacing(1),
  },
}));

function OrderPage() {
  const { email, role } = useParams();

  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [data, setData] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const classes = useStyles();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    await orderService.getAllOrders();
    const res = await orderService.getOrders(email);
    console.log(res);
    if (res.status === 200) {
      setOrderItems(res.data.content);
      setData(res.data);
      if (res.data.hasOrdered && role === "customer") {
        setSnackbarMessage(
          `Your order has been placed. You can pay by saying your order number. Enjoy your meal!`
        );
        setSnackbar(true);
        setSeverity("success");
      }
    } else {
      setSnackbarMessage(res.data?.message);
      setSnackbar(true);
      setSeverity("error");
    }
    setLoading(false);
  }, [email, role]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDeleteItem = (itemId) => {
    console.log(orderItems);
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.menu.id !== itemId)
    );
    orderService.deleteOrder(itemId).then((res) => {
      console.log(res);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) => {
        if (item.menu.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleIncreaseQuantity = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) => {
        if (item.menu.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleOrderNow = async () => {
    const menuIdAndQuantity = orderItems.map((item) => ({
      menuId: item.menu.id,
      quantity: item.quantity,
    }));
    const res = await orderService.orderNow(menuIdAndQuantity);
    console.log(res);
    if (res?.status === 200) {
      window.location.reload();
    } else {
      setSnackbarMessage("Error!");
      setSnackbar(true);
      setSeverity("error");
    }
  };

  const handleCompleteNow = async () => {
    const res = await orderService.completeNow(email);
    if (res.status === 200) {
      setSnackbarMessage("This order has been successfully completed!");
      setSnackbar(true);
      setSeverity("success");
      window.location.href = "/allOrders";
    }
    console.log(res);
  };

  return (
    <CssBaseline>
      <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={snackbarMessage}
        severity={severity}
        autoHideDuration={null}
      />
      <Container maxWidth="lg">
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingRight={2}
            marginBottom={5}
          >
            {data.hasOrdered && (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  align="center"
                  gutterBottom
                  className={classes.orderNumber}
                >
                  Order Number: <strong>{data.userId}</strong>
                </Typography>
              </Grid>
            )}
            <HelperIcon text="You can order by clicking ORDER NOW button. Also, you can update your order from the table!" />
          </Box>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress
                style={{ color: "#999", justifyContent: "center" }}
              />
            </div>
          ) : (
            <Grid
              container
              spacing={4}
              alignItems="stretch"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  gutterBottom
                  className={classes.menuName}
                >
                  Order Details
                </Typography>
                <Divider
                  sx={{ width: { xs: "20%", md: "30%" }, margin: "auto" }}
                />
              </Grid>
              <OrderTable
                role={role}
                classes={classes}
                orderItems={orderItems}
                data={data}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDeleteItem={handleDeleteItem}
              />
              <Grid item xs={12} className={classes.orderButtonContainer}>
                {role !== "waiter" && (
                  <Button
                    variant="contained"
                    className={classes.orderButton}
                    disableElevation
                    disabled={data.hasOrdered}
                    size="large"
                    onClick={handleOrderNow}
                  >
                    Order Now
                  </Button>
                )}
                {role === "waiter" && (
                  <Button
                    variant="contained"
                    className={classes.orderButton}
                    disableElevation
                    size="large"
                    onClick={handleCompleteNow}
                    style={{
                      backgroundColor: "#B82626",
                      "&:hover": {
                        backgroundColor: "#8A1D1D",
                      },
                    }}
                  >
                    Complete Now
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </CssBaseline>
  );
}

export default OrderPage;
