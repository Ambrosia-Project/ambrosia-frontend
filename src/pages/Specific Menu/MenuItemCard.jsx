import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  ingredients: {
    color: "white",
    fontFamily: "Lavonia Classy",
    fontStyle: "italic",
  },
}));

const MenuItemCard = ({ menuItem }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {menuItem.imageFile ? (
        <CardMedia
          className={classes.image}
          image={menuItem.imageFile}
          title={menuItem.meal_name}
        />
      ) : (
        <div className={classes.noPhotoImage}>
          <Typography variant="h6" color="textSecondary">
            No photo has been added
          </Typography>
        </div>
      )}
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="#FFDCA9"
          fontFamily="Poppins"
          sx={{
            fontSize: { xs: "1.8rem", md: "2rem", lg: "2.2rem" },
            fontWeight: 200,
          }}
        >
          {menuItem.meal_name}
        </Typography>
        <Typography
          variant="body2"
          className={classes.ingredients}
          sx={{ fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" } }}
        >
          {menuItem.ingredients}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
