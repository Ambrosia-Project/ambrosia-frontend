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
import { useParams } from "react-router-dom";
import menuListService from "../../services/menuList.service";
import SearchBar from "../../components/SearchBar";
import Filter from "./Filter";
import MenuItemCard from "./MenuItemCard";
import HelperIcon from "../../components/HelpIcon";

function SpecificMenuPage() {
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mealType, setMealType] = useState("");
  const [allergyType, setAllergyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [menuItemsArray, setMenuItemsArray] = useState([]);
  const [props, setProps] = useState({
    type: name,
    keyword: "",
    filter: {
      min_price: minPrice,
      max_price: maxPrice,
      extra_type: mealType,
    },
  });

  const init = useCallback(async () => {
    setLoading(true);
    const res = await menuListService.getMenuList(name);
    if (res?.status === 200) {
      setMenuItemsArray(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (priceRange !== "") {
      convertPriceRange(priceRange);
    }
  }, [priceRange]);

  function convertPriceRange(priceRange) {
    const [minPriceTemp, maxPriceTemp] = priceRange
      .split("-")
      .map((price) => parseInt(price.trim()));
    setMinPrice(minPriceTemp);
    setMaxPrice(maxPriceTemp);
  }

  const applySearch = async (srchText) => {
    setLoading(true);
    let propsTemp = { ...props, keyword: srchText };
    setProps(propsTemp);
    const res = await menuListService.getFilteredMenu(propsTemp);
    setMenuItemsArray(res.data);
    setLoading(false);
  };

  const handleSearch = (srchText) => {
    setSearchText(srchText);
    applySearch(srchText);
  };

  const applyFilters = async () => {
    setLoading(true);
    let propsTemp = {
      ...props,
      filter: {
        extra_type: mealType,
        min_price: minPrice,
        max_price: maxPrice,
      },
    };
    setProps(propsTemp);
    const res = await menuListService.getFilteredMenu(propsTemp);
    setMenuItemsArray(res.data);
    setLoading(false);
  };

  const clearFilters = async () => {
    setLoading(true);
    let propsTemp = {
      ...props,
      filter: {
        extra_type: "",
        min_price: -1,
        max_price: -1,
      },
    };
    setProps(propsTemp);
    const res = await menuListService.getFilteredMenu(propsTemp);
    setMenuItemsArray(res.data);
    setLoading(false);
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            paddingRight={2}
          >
            <HelperIcon text="You can search by clicking the search icon or by pressing enter. Also, you can apply/clear filter(s) throughout filtering" />
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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <SearchBar onSearch={handleSearch} />
                <Filter
                  setMealType={setMealType}
                  setAllergyType={setAllergyType}
                  setPriceRange={setPriceRange}
                  mealType={mealType}
                  allergyType={allergyType}
                  priceRange={priceRange}
                  applyFilters={applyFilters}
                  clearFilters={clearFilters}
                />
              </Box>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress
                    style={{ color: "#999", justifyContent: "center" }}
                  />
                </div>
              ) : menuItemsArray?.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                  No menu items found
                </Typography>
              ) : (
                <Grid
                  container
                  spacing={3}
                  justifyContent={
                    menuItemsArray?.length === 1 ? "center" : "flex-start"
                  }
                >
                  {menuItemsArray?.map((menuItem) => {
                    return (
                      <Grid item key={menuItem.id} xs={12} sm={6} md={6} lg={6}>
                        <MenuItemCard menuItem={menuItem} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}

export default SpecificMenuPage;
