import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MenuListItemsPage from "./MenuListItemsPage";
import leaves from "../../assets/images/ambrosia.png";

function MenuListPage() {
  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            backgroundImage: `url(${leaves})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
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
                Choose Your Taste
              </Typography>
              <Divider
                sx={{ width: { xs: "20%", md: "30%" }, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: 0, my: 0 }}>
              <MenuListItemsPage />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}

export default MenuListPage;
