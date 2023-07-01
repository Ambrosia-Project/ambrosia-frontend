import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { makeStyles } from "@mui/styles";

// import SearchBar from "../components/SearchBar";

// import Filter from "./Filter";

import logo from "../assets/images/logo512.png";

const exampleAllergies = [
  "Milk",
  "Egg",
  "Fish",
  "Peanut",
  "Wheat",
  "Soy",
  "Sesame",
];

const userAllergies = ["Fish", "Soy"];

// Custom styles
const useStyles = makeStyles({
  addButton: {
    backgroundColor: "#5e714e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4a5f40",
    },
    "&:active": {
      backgroundColor: "#3a4932",
    },
  },
  saveButton: {
    marginTop: "96px",
    backgroundColor: "#5e714e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4a5f40",
    },
    "&:active": {
      backgroundColor: "#3a4932",
    },
  },
});

export default function AddAllergies() {
  const [selectedOption, setSelectedOption] = useState("");
  const [allergies, setAllergies] = useState([]);
  const classes = useStyles(); // Apply custom styles
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddAllergie = () => {
    if (selectedOption && !allergies.includes(selectedOption)) {
      const updatedAllergies = [...allergies, selectedOption];
      setAllergies(updatedAllergies);
      setSelectedOption("");
    }
  };

  const handleDeleteAllergy = (index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
  };

  const handleSaveChanges = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.allergies = allergies;
      localStorage.setItem("user", JSON.stringify(user));
      setSnackbarOpen(true); // Showing the snackbar
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const localAllergies = user.allergies;
      setAllergies(localAllergies);
    }
  };

  return (
    <CssBaseline>
      <Container maxWidth="xs">
        <Grid container>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{ padding: "1rem", textAlign: "center" }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "200px", height: "200px" }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#5e714e",
                  fontWeight: "bold",
                  marginTop: "36px",
                  marginBottom: "36px",
                }}
              >
                Full Allergies List
              </Typography>
              <div maxWidth="xs" sx={{ marginBottom: "48px" }}>
                {allergies.map((allergie, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #adb5bd",
                      padding: "10px",
                      margin: "5px 24px",
                    }}
                  >
                    <Typography variant="body1" sx={{ textAlign: "left" }}>
                      {allergie}
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteAllergy(index)}
                      sx={{ marginLeft: "auto" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </div>
              <Typography
                variant="h8"
                sx={{
                  color: "#5e714e",
                  fontWeight: "bold",
                  textAlign: "left",
                  margin: "24px",
                  display: "block",
                }}
              >
                Add Allergy:
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: "0 24px" }}
              >
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel
                      id="example-dropdown-label"
                      sx={{ backgroundColor: "#fff" }}
                    >
                      Choose from the menu
                    </InputLabel>
                    <Select
                      labelId="example-dropdown-label"
                      id="example-dropdown"
                      value={selectedOption}
                      onChange={handleChange}
                      sx={{ width: "180px" }}
                    >
                      {exampleAllergies.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className={classes.addButton} // Apply custom styles
                    sx={{
                      width: "80px",
                      height: "56px",
                      backgroundColor: "#5e714e",
                      color: "#fff",
                      textTransform: "none",
                    }}
                    onClick={handleAddAllergie}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Button
                className={classes.saveButton} // Apply custom styles
                sx={{
                  marginTop: "96px",
                  padding: "12px 36px",
                  backgroundColor: "#5e714e",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "24px",
                }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Adjust the duration as desired
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Container>
    </CssBaseline>
  );
}
