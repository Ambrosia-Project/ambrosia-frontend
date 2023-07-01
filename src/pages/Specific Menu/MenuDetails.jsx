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
import { RestaurantMenu, ShoppingCart } from "@mui/icons-material";
import { ErrorOutline } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuListService from "../../services/menuList.service";
import orderService from "../../services/order.service";
import HelperIcon from "../../components/HelpIcon";
import { Add, Remove } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CustomSnackbar from "../../components/Snackbar";
import SessionHelper from "../../helpers/SessionHelper";

const useStyles = makeStyles((theme) => ({
  menuName: {
    fontFamily: "Poppins",
    fontWeight: "lighter",
    fontSize: "2rem",
    color: "#EEBA2B",
  },

  menuImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  noPhotoImage: {
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[300],
  },
  ingredientsTitle: {
    marginTop: "1rem",
    color: "#6a9f6f",
  },
  ingredientsList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
    marginLeft: theme.spacing(1.5),
  },
  ingredientItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    color: "#FF914D",
  },
  ingredientIcon: {
    marginRight: "0.5rem",
    color: "initial",
  },
  typeTitle: {
    marginTop: "1rem",
    color: "#6a9f6f",
  },
  shoppingCartButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  priceText: {
    // marginRight: "0.5rem",
    // marginRight: theme.spacing(1.5),
    display: "flex",
    alignItems: "right",
    marginBottom: "1rem",
    justifyContent: "flex-end",
  },
  extraType: {
    marginLeft: theme.spacing(1.5),
  },
  counterBox: {
    marginRight: theme.spacing(1.5),
    backgroundColor: "rgba(205, 219, 193, 0.2)",
    padding: theme.spacing(1),
    borderRadius: "1rem",
  },
  warningContainer: {
    display: "flex",
    alignItems: "right",
    marginTop: theme.spacing(2),
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-end",
    },
  },
  warningIcon: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(-0.7),
    color: theme.palette.warning.main,
    flexShrink: 0,
  },
  warningText: {
    color: theme.palette.warning.main,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "right",
  },
}));

const MenuDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menuDetails, setMenuDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [added, setAdded] = useState(false);
  const role = SessionHelper.getUser().role;

  const classes = useStyles();

  const fetchMenuDetails = useCallback(async () => {
    setLoading(true);
    const res = await menuListService.getMenuDetails(id);
    if (res.status === 200) {
      setMenuDetails(res.data);
      if (res.data.hasOrdered) {
        setSnackbarMessage(
          "You have an order in progress. You can re-order after your order is complete."
        );
        setSnackbar(true);
        setSeverity("info");
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchMenuDetails();
  }, [fetchMenuDetails]);

  const handleClick = async () => {
    const res = await orderService.addToCart(quantity, id);
    console.log(res);
    if (res.status === 200) {
      window.location.reload();
    } else if (res.status === 400) {
      setSnackbarMessage("This meal is already on your card. Please add more on order page!");
      setSnackbar(true);
      setSeverity("error");
      setAdded(true);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <CssBaseline>
      {role === "customer" && (
        <CustomSnackbar
          snackbar={snackbar}
          setSnackbar={setSnackbar}
          snackbarMessage={snackbarMessage}
          severity={severity}
          autoHideDuration={null}
        />
      )}
      <Container maxWidth="lg">
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            paddingRight={2}
          >
            <HelperIcon text="You can see the full details of the chosen meal. You can add the chosen meal to the cart by clicking the button below!" />
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
                  {menuDetails.meal_name} DETAILS
                </Typography>
                <Divider
                  sx={{ width: { xs: "20%", md: "30%" }, margin: "auto" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {menuDetails.imageFile !== "empty" ? (
                  <img
                    src={`data:image/jpeg;base64,${menuDetails.imageFile}`}
                    alt={menuDetails.meal_name}
                    className={classes.menuImage}
                  />
                ) : (
                  <div className={classes.noPhotoImage}>
                    <Typography variant="h6" color="textSecondary">
                      No photo has been added
                    </Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.ingredientsTitle}>
                  Ingredients:
                </Typography>

                <div className={classes.ingredientsList}>
                  {menuDetails.ingredients &&
                    menuDetails.ingredients
                      .split(",")
                      .map((ingredient, index) => (
                        <div key={index} className={classes.ingredientItem}>
                          <RestaurantMenu className={classes.ingredientIcon} />
                          <Typography>{ingredient.trim()}</Typography>
                        </div>
                      ))}
                </div>
                <Divider style={{ width: "100%" }} />
                <Typography variant="h6" className={classes.typeTitle}>
                  Type:
                </Typography>
                <Typography className={classes.extraType}>
                  {menuDetails.extra_type}
                </Typography>

                <div style={{ marginTop: "3rem" }}>
                  {role === "customer" && menuDetails.isAllergic && (
                    <Box className={classes.warningContainer}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <span
                          className={classes.warningText}
                          display="inline-block"
                        >
                          <ErrorOutline className={classes.warningIcon} />
                          Allergenic substance(s) alert! Please be careful!
                        </span>
                      </div>
                    </Box>
                  )}
                  <Typography className={classes.priceText}>
                    Price: {menuDetails.price * quantity}€
                  </Typography>
                  {role === "customer" && (
                    <div className={classes.shoppingCartButton}>
                      <Box
                        display="flex"
                        alignItems="center"
                        className={classes.counterBox}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleDecrement}
                          disabled={menuDetails.hasOrdered && added}
                          style={{
                            minWidth: "2rem",
                            padding: "0",
                            backgroundColor: "#EEBA2B",
                          }}
                        >
                          <Remove />
                        </Button>
                        <Typography variant="h6" style={{ margin: "0 .2rem" }}>
                          {quantity}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleIncrement}
                          disabled={menuDetails.hasOrdered && added}
                          style={{
                            minWidth: "2rem",
                            padding: "0",
                            backgroundColor: "#EEBA2B",
                          }}
                        >
                          <Add />
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ShoppingCart style={{ color: "#EEBA2B" }} />}
                        style={{ backgroundColor: "#5E714E" }}
                        onClick={handleClick}
                        disabled={menuDetails.hasOrdered && added}
                      >
                        Add to cart
                      </Button>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </CssBaseline>
  );
};

export default MenuDetails;
