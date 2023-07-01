import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Popover,
  Select,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import React, { useState } from "react";
import constants from "../../assets/constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF914D",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&.applyButton:hover": {
            backgroundColor: "#4F704E",
          },
        },
      },
    },
  },
});

const Filter = ({
  setMealType,
  setAllergyType,
  setPriceRange,
  mealType,
  allergyType,
  priceRange,
  applyFilters,
  clearFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleApplyFilters = () => {
    applyFilters();
    handleCloseFilterMenu();
  };

  const handleClearFilters = () => {
    setMealType("");
    setAllergyType("");
    setPriceRange("");
    clearFilters();
  };

  return (
    <div>
      <IconButton
        color="primary"
        sx={{
          p: 2,
          width: "3rem",
          height: "3rem",
          color: "#5E9459",
          "&:hover": {
            color: "#A5C7A1",
          },
          my: 1,
        }}
        aria-label="filter"
        component="span"
        size="large"
        onClick={handleOpenFilterMenu}
      >
        <FilterIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilterMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ThemeProvider theme={theme}>
          <Box sx={{ padding: "1rem", minWidth: "240px", maxWidth: "400px" }}>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="meal-type-select">Meal Type</InputLabel>
              <Select
                labelId="meal-type-select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <MenuItem value="" disabled key={"meal-types"}>
                  All Meal Types
                </MenuItem>
                {constants.mealTypes.map((obj) => {
                  return (
                    <MenuItem value={obj.value} key={obj}>
                      {obj.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Allergy Type</InputLabel>
              <Select
                value={allergyType}
                onChange={(e) => setAllergyType(e.target.value)}
              >
                <MenuItem value="" disabled key={"meal-types"}>
                  All Allergy Types
                </MenuItem>
                {constants.allergyTypes.map((obj) => {
                  return <MenuItem value={obj.value} key={obj}>{obj.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <MenuItem value="" disabled key={"price-ranges"}>
                  All Price Ranges
                </MenuItem>
                {constants.priceRange.map((obj) => {
                  return (
                    <MenuItem value={obj.value} key={obj}>
                      {obj.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                className="applyButton"
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                  backgroundColor: "#7DAA7B",
                  minWidth: "5rem",
                  mx: 1,
                  color: "white",
                }}
              >
                Apply Filters
              </Button>
              <Button
                variant="contained"
                onClick={handleClearFilters}
                sx={{
                  backgroundColor: "#FF914D",
                  minWidth: "5rem",
                  mx: 1,
                  color: "white",
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Box>
        </ThemeProvider>
      </Popover>
    </div>
  );
};

export default Filter;
