import {
  Button,
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import logo from "../assets/images/logo512.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { textAlign } from "@mui/system";
import confirmIcon from "../assets/images/confirm-icon.png";
import careIcon from "../assets/images/care-icon.png";
import happyIcon from "../assets/images/happy-icon.png";
import chefIcon from "../assets/images/chef-icon.png";
import preferenceIcon from "../assets/images/preference-icon.png";
import satisfiedCustomerOne from "../assets/images/sci_1.jpg";
import satisfiedCustomerTwo from "../assets/images/sci_2.jpg";
import satisfiedCustomerThree from "../assets/images/sci_3.jpg";
import satisfiedCustomerFour from "../assets/images/sci_4.jpg";
import satisfiedCustomerFive from "../assets/images/sci_6.jpg";

// import { ArrowBack, ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: "3% 5%",
    // width: "35%",
    margin: "5% auto",
  },
  dividerBox: {
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
  ambrosiaLogo: {
    width: "16rem",
    height: "16rem",
    marginTop: "4rem",
    [theme.breakpoints.up("sm")]: {
      width: "18rem",
      height: "18rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "20rem",
      height: "20rem",
    },
    [theme.breakpoints.up("lg")]: {
      width: "22rem",
      height: "22rem",
    },
  },
  introductionParagraphContainer: {
    padding: "0 3rem",
    [theme.breakpoints.up("lg")]: {
      textAlign: "center",
    },
  },
  introductionParagraph: {
    marginTop: "4rem",
    textAlign: "left",
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "center",
      fontSize: "1.6rem",
    },
  },
  getStartedButton: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.4rem",
    },
  },
  buttonContainer: {
    textAlign: "center",
    fontWeight: "bolder",
    marginTop: "4rem",
  },
  satisfiedCustomerContainer: {
    display: "flex",
  },
  satisfiedCustomer: {
    padding: "0.25rem 0.25rem",
    backgroundColor: "#fff",
    marginLeft: "-1.2rem",
    borderRadius: "4rem",
    height: "4rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "4rem",
      height: "4rem",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "4rem",
      height: "5rem",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "4rem",
      height: "6rem",
    },
  },
  secondPage: {
    marginTop: "4rem",
  },
  testimonialBox: {
    [theme.breakpoints.up("sm")]: {
      padding: "1rem 4rem",
    },
    [theme.breakpoints.up("md")]: {
      padding: "2rem 5rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "3rem 6rem",
    },
  },
  testimonialText: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  },
  arrowButton: {
    marginTop: "2rem",
  },
  aboutUsText: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.6rem",
    },
  },
}));

export default function MetroBoomin() {
  const classes = useStyles();
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const testimonialContents = [
    "As someone with celiac disease, I can choose anything on the menu and know that it is completely gluten-free. Thanks to ambrosia, one more thing to worry about is gone.",
    "I'm a meticulous chef myself when it comes to allergens and Ambrosia has truly been a lifesaver in this regard. The website design is also very user-friendly. Thank you, Ambrosia team!",
    "Ambrosia offers an excellent selection of allergen-based menus. They bring together healthy and delicious options. Using this platform has truly made meal choices much easier.",
  ];

  const testimonialPeople = [
    "Emma Wilson Roberts",
    "Alexander Garcia",
    "Olivia Patel",
  ];
  const testimonialTitles = ["Culinary Traveler and Writer", "Chef", "Editor"];

  const [contentIndex, setContentIndex] = useState(0);

  const handlePrevClick = () => {
    setContentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : testimonialPeople.length - 1
    );
  };

  const handleNextClick = () => {
    setContentIndex((prevIndex) =>
      prevIndex < testimonialPeople.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <CssBaseline>
      <Container fluid>
        <Grid align="center">
          <Paper elevation={3} className={classes.paperStyle}>
            <Grid align="center" sx={{ marginTop: "3rem" }}>
              <Grid className={classes.firstPage}>
                {/* first part of the landing page */}
                <img
                  className={classes.ambrosiaLogo}
                  alt="ambrosia logo"
                  src={logo}
                />
                <div className={classes.introductionParagraphContainer}>
                  <Typography
                    className={classes.introductionParagraph}
                    sx={{ marginTop: "4rem", textAlign: "left" }}
                  >
                    <span style={{ color: "#f59f00" }}>Allergen-free</span>{" "}
                    meals are prepared by our attentive chefs.
                  </Typography>
                </div>
                <Box
                  className={classes.dividerBox}
                  sx={{
                    width: "80%",
                    height: "0.15rem",
                    marginTop: "2rem",
                    backgroundColor: "#5e714e",
                  }}
                ></Box>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.getStartedButton}
                    onClick={handleClick}
                    variant="contained"
                    type="submit"
                    sx={{
                      padding: "0.5rem 1.8rem",
                      backgroundColor: "#5e714e",
                      "&: hover": {
                        backgroundColor: "#6e815e",
                      },
                      "&:active": {
                        backgroundColor: "#5e714e",
                      },
                      fontSize: "1rem",
                      marginTop: 2,
                    }}
                  >
                    GET STARTED
                  </Button>
                </div>
              </Grid>
              <Grid align="center" className={classes.secondPage} xs={12}>
                <Grid container spacing={2}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justifyContent="center"
                      className={classes.satisfiedCustomerContainer}
                    >
                      <img
                        alt="customer image"
                        src={satisfiedCustomerOne}
                        className={classes.satisfiedCustomer}
                      />
                      <img
                        alt="customer image"
                        src={satisfiedCustomerTwo}
                        className={classes.satisfiedCustomer}
                      />
                      <img
                        alt="customer image"
                        src={satisfiedCustomerThree}
                        className={classes.satisfiedCustomer}
                      />
                      <img
                        alt="customer image"
                        src={satisfiedCustomerFour}
                        className={classes.satisfiedCustomer}
                      />
                      <img
                        alt="customer image"
                        src={satisfiedCustomerFive}
                        className={classes.satisfiedCustomer}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={2} align="center">
                    <Grid item xs={12} alignItems="center">
                      <Typography
                        sx={{
                          fontSize: "2.4rem",
                          color: "#f59f00",
                          fontWeight: "bold",
                        }}
                      >
                        +5000
                      </Typography>
                      <Typography
                        sx={{
                          color: "#5e714e",
                          fontWeight: "bold",
                          marginBottom: "4rem",
                          fontSize: "1.2rem",
                        }}
                      >
                        SATISFIED CUSTOMER
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography
                  sx={{
                    marginTop: "3rem",
                    color: "#5e714e",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  TESTIMONIALS
                </Typography>
                {/* ---------------------------------------- CAROUSEL --------------------------------- */}
                <Box
                  className={classes.testimonialBox}
                  sx={{
                    backgroundColor: "#5e714e",
                    width: "90%",
                    marginTop: "2rem",
                    borderRadius: "1.2rem",
                    padding: "1rem 2rem",
                    transition: "all 0.5s",
                  }}
                >
                  {testimonialContents.map((content, index) => (
                    <div
                      key={index}
                      style={{
                        display: index === contentIndex ? "block" : "none",
                      }}
                    >
                      <Typography
                        className={classes.testimonialText}
                        sx={{
                          textAlign: "left",
                          color: "#e1ecd3",
                          fontStyle: "italic",
                          transition: "opacity 0.3s, transform 0.5s",
                        }}
                      >
                        {testimonialContents[index]}
                      </Typography>
                      <Typography
                        className={classes.testimonialText}
                        sx={{
                          textAlign: "left",
                          color: "#c5d7a2",
                          fontStyle: "italic",
                          marginTop: "1rem",
                          transition: "opacity 0.3s, transform 0.5s",
                        }}
                      >
                        {testimonialPeople[index]}
                      </Typography>
                      <Typography
                        className={classes.testimonialText}
                        sx={{
                          textAlign: "left",
                          color: "#fff",
                          fontStyle: "italic",
                          fontSize: "0.6rem",
                          marginTop: "0.2rem",
                          transition: "opacity 0.3s, transform 0.5s",
                        }}
                      >
                        {testimonialTitles[index]}
                      </Typography>
                    </div>
                  ))}
                </Box>
                {/* ---------------------------------------- CAROUSEL --------------------------------- */}
                {/* <Box
                  sx={{
                    width: "40%",
                    height: "1rem",
                    marginTop: "1.6rem",
                    backgroundColor: "#f59f00",
                    borderRadius: "2rem",
                  }}
                ></Box> */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    className={classes.arrowButton}
                    onClick={handlePrevClick}
                    sx={{
                      backgroundColor: "#fff",
                      border: "2px solid #f59f00",
                      color: "#f59f00",
                      borderRadius: "2rem",
                    }}
                  ></Button>
                  <Button
                    className={classes.arrowButton}
                    onClick={handleNextClick}
                    sx={{
                      backgroundColor: "#fff",
                      border: "2px solid #f59f00",
                      color: "#f59f00",
                      borderRadius: "2rem",
                    }}
                  ></Button>
                </Grid>
                <Typography
                  sx={{
                    color: "#5e714e",
                    fontWeight: "bold",
                    marginTop: "3rem",
                  }}
                >
                  WE CARE ABOUT YOU!
                </Typography>
                <img
                  alt="care icon"
                  src={careIcon}
                  style={{
                    height: "8rem",
                    marginTop: "3rem",
                    marginBottom: "3rem",
                  }}
                />
              </Grid>
              <Typography
                className={classes.aboutUsText}
                sx={{
                  color: "#5e714e",
                  fontWeight: "bold",
                  marginTop: "2rem",
                }}
              >
                ABOUT US
              </Typography>
              <Grid
                align="center"
                className={classes.thirdPage}
                sx={{ marginTop: "3rem" }}
              >
                <Grid container spacing={2}>
                  <Grid container item xs={12} spacing={2} alignItems="center">
                    <Grid item xs={6} alignItems="center">
                      <img
                        alt="preference icon"
                        src={preferenceIcon}
                        style={{
                          width: "70%",
                          height: "70%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} alignItems="center">
                      <Typography
                        sx={{ textAlign: "left" }}
                        className={classes.aboutUsText}
                      >
                        Simply tell us what you are alleric to and we will take
                        care of the rest.
                      </Typography>
                      <Grid />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={6} alignItems="center">
                        <Typography
                          sx={{ textAlign: "left" }}
                          className={classes.aboutUsText}
                        >
                          Our cooks only use local, fresh and organic products
                          to prepare your meals.
                        </Typography>
                      </Grid>
                      <Grid item xs={6} alignItems="center">
                        <img
                          alt="chef icon"
                          src={chefIcon}
                          style={{
                            width: "70%",
                            height: "70%",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={6} alignItems="center">
                        <img
                          alt="confirmation icon"
                          src={confirmIcon}
                          style={{
                            width: "70%",
                            height: "70%",
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} alignItems="center">
                        <Typography
                          sx={{ textAlign: "left" }}
                          className={classes.aboutUsText}
                        >
                          Browse our menu, place your order and savor the taste
                          of delicious, allergen-free cuisine.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography
                className={classes.aboutUsText}
                sx={{ color: "#f59f00", fontWeight: "bold", marginTop: "3em" }}
              >
                ENJOY YOUR WORRY-FREE MEAL!
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </CssBaseline>
  );
}
