import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuListService from "../../services/menuList.service";
import SearchBar from "../../components/SearchBar";
import Filter from "./Filter";
import MenuItemCard from "./MenuItemCard";
import veganPhoto from "../../assets/images/vegan.jpg";

function SpecificMenuPage() {
  const { name } = useParams();
  const [menuItemsArray, setMenuItemsArray] = useState([]);

  const menuItems = [
    {
      id: 1,
      ingredients: "bean, peanuts",
      meal_name: "Tofu Bowl",
      menu_type: "Vegan",
      price: 45,
      imageFile: veganPhoto,
    },
    {
      id: 2,
      ingredients: "bean, peanuts",
      meal_name: "Tofu Bowl",
      menu_type: "Vegan",
      price: 45,
      imageFile: veganPhoto,
    },
    {
      id: 3,
      ingredients: "bean, peanuts",
      meal_name: "Tofu Bowl",
      menu_type: "Vegan",
      price: 45,
      imageFile: veganPhoto,
    },
    {
      id: 4,
      ingredients: "bean, peanuts",
      meal_name: "Tofu Bowl",
      menu_type: "Vegan",
      price: 45,
    },
  ];

  //   const init = useCallback(async () => {
  //     const res = await menuListService.getMenuList(name);
  //     console.log(res);
  //     if (res?.status === 200) {
  //       setMenuItemsArray(res.data);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     init();
  //   }, [init]);

  const handleSearch = (searchText) => {
    console.log("Search text:", searchText);
    // Perform search functionality here
  };

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
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
                {name} Menu
              </Typography>
              <Divider
                sx={{ width: { xs: "20%", md: "30%" }, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: 0, my: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <SearchBar onSearch={handleSearch} />
                <Filter />
              </Box>
              <Grid container spacing={3}>
                {menuItems.map((menuItem) => (
                  <Grid item key={menuItem.id} xs={12} sm={6} md={6} lg={6}>
                    <MenuItemCard menuItem={menuItem} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}

export default SpecificMenuPage;
