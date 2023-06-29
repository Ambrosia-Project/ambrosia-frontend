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
  import React, { useCallback, useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import menuListService from "../../services/menuList.service";
  import HelperIcon from "../../components/HelpIcon";
  import { makeStyles } from "@mui/styles";
  
  const useStyles = makeStyles((theme) => ({
    menuName: {
      fontFamily: "Poppins",
      fontWeight: "lighter",
      fontSize: "2rem",
      color: "#EEBA2B",
    },
    customDivider: {
      width: "40%",
      margin: "auto",
    },
    menuImage: {
      width: "100%",
      height: 300,
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
      marginTop: "3rem",
    },
    priceText: {
      marginRight: "0.5rem",
      marginRight: theme.spacing(1.5),
    },
    extraType: {
      marginLeft: theme.spacing(1.5),
    },
  }));
  
  const MenuDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [menuDetails, setMenuDetails] = useState({});
    const classes = useStyles();
  
    const fetchMenuDetails = useCallback(async () => {
      setLoading(true);
      const res = await menuListService.getMenuDetails(id);
      if (res.status === 200) {
        setMenuDetails(res.data);
      }
      setLoading(false);
    }, [id]);
  
    useEffect(() => {
      fetchMenuDetails();
    }, [fetchMenuDetails]);
  
    return (
      <CssBaseline>
        <Container maxWidth="md">
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
                  <Divider className={classes.customDivider} />
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
                  <Divider
                    className={classes.customDivider}
                    style={{ width: "100%" }}
                  />
                  <Typography variant="h6" className={classes.typeTitle}>
                    Type:
                  </Typography>
                  <Typography className={classes.extraType}>
                    {menuDetails.extra_type}
                  </Typography>
                  <div className={classes.shoppingCartButton}>
                    <Typography className={classes.priceText}>
                      Price: {menuDetails.price}€
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ShoppingCart style={{ color: "#EEBA2B" }} />}
                      style={{ backgroundColor: "#5E714E" }}
                    >
                      Add to cart
                    </Button>
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
  