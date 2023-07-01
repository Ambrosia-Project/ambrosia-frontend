import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import constants from "../../assets/constants";

function MenuListItemsPage() {
  const menuListItems = constants.menuListItems;
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const history = useHistory();

  const menuHandler = async (name) => {
    history.push(`/menuList/${name}`);
  };

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {menuListItems.map((menuItem) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  key={menuItem.id}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Paper
                    sx={{
                      borderRadius: "16px",
                      p: matches ? 1 : 0.5,
                      textAlign: "center",
                      width: { xs: "75%", md: "70%", lg: "60%" },
                      height: "auto",
                      paddingBottom: { xs: "80%", md: "70%", lg: "60%" },
                      position: "relative",
                      marginTop: "1rem",
                      transition: "box-shadow 0.5s ease",
                      "&:hover": {
                        filter: "brightness(150%)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onClick={() => menuHandler(menuItem.name)}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#425340",
                        borderRadius: "1rem",
                      }}
                    >
                      <Typography
                        variant={matches ? "body2" : "h6"}
                        component="h3"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: matches ? "12px" : "16px",
                        }}
                      >
                        {menuItem.name}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
}

export default MenuListItemsPage;
