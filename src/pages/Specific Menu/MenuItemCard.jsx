import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EuroSymbolOutlined, ErrorOutline } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#5E714E",
  },
  image: {
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: theme.spacing(1),
  },
  noPhotoImage: {
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[300],
  },
  noPhotoIcon: {
    fontSize: 72,
    opacity: 0.5,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  price: {
    color: "#474646",
    fontFamily: "Poppins",
    fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
  },
  priceIcon: {
    color: "#FFDCA9",
  },
  priceText: {
    color: "#FFDCA9",
    fontFamily: "Poppins",
    fontSize: { xs: "1rem", md: "1rem", lg: "2rem" },
    display: "flex",
    alignItems: "center",
  },
  ingredients: {
    color: "white",
    fontFamily: "Lavonia Classy",
    fontStyle: "italic",
  },
  warningContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  warningIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.warning.main,
  },
  warningText: {
    color: theme.palette.warning.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    fontFamily: "Poppins",
  },
}));

const MenuItemCard = ({ menuItem }) => {
  const classes = useStyles();
  const history = useHistory();

  const [isHovered, setIsHovered] = useState(false);

  const handleCardHover = () => {
    setIsHovered(true);
  };

  const handleCardLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    history.push(`/menuDetails/${menuItem.id}`);
  };

  return (
    <Card
      className={classes.card}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}
      elevation={isHovered ? 8 : 1}
    >
      {menuItem.imageFile !== "empty" ? (
        <CardMedia
          className={classes.image}
          component="img"
          src={`data:image/jpeg;base64,${menuItem.imageFile}`}
          title={menuItem.meal_name}
        />
      ) : (
        <div className={classes.noPhotoImage}>
          <Typography variant="h6" color="textSecondary">
            No photo has been added
          </Typography>
        </div>
      )}
      <CardContent
        className={classes.content}
        sx={{
          transition: "box-shadow 0.3s ease",
          boxShadow: isHovered ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              component="h4"
              gutterBottom
              color="#FFDCA9"
              fontFamily="Poppins"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.7rem" },
                fontWeight: 200,
              }}
            >
              {menuItem.meal_name}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              className={classes.ingredients}
              sx={{ fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" } }}
            >
              {menuItem.mainIngredients}
            </Typography>

            <Typography className={classes.priceText}>
              {menuItem.price}
              <EuroSymbolOutlined fontSize="small" className={classes.priceIcon} />
            </Typography>
          </Grid>
        </Grid>
        {menuItem.isAllergic && (
          <Box className={classes.warningContainer}>
            <ErrorOutline className={classes.warningIcon} />
            <Typography variant="body2" className={classes.warningText}>
              This meal includes allergenic substance(s)! Please be careful!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
