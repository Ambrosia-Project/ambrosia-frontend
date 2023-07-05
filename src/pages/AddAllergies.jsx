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
  Alert,
  useMediaQuery,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import logo from "../assets/images/logo512.png";
import CustomSnackbar from "../components/Snackbar";
import allergiesService from "../services/allergies.service";

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
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [allergicIngredients, setAllergicIngredients] = useState([]); // from database
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const smallMatches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getAllergies = async () => {
    try {
      const res = await allergiesService.getAllergies();
      console.log(res);
      if (res?.status === 200) {
        let data = res?.data;
        setAllergicIngredients(data);
      } else {
        setSnackbarMessage(res?.data?.message);
        setSnackbar(true);
        setSeverity("error");
      }
    } catch (error) {
      console.error(error);
      // Handle any error, e.g., show an error snackbar
    }
  };

  useEffect(() => {
    getAllergies();
  }, []);

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
      setSnackbar(true);
      setSnackbarMessage("Changes saved successfully!");
      setSeverity("success");
    }
  };

  const handleSearch = (text) => {
    console.log(text);
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
      <Container maxWidth="lg">
        <CustomSnackbar
          snackbar={snackbar}
          setSnackbar={setSnackbar}
          snackbarMessage={snackbarMessage}
          severity={severity}
          autoHideDuration={3000}
        />
        <Grid container>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{ padding: "1rem", textAlign: "center" }}
              sx={{
                my: { xs: 3, md: 6 },
                p: { xs: 2, md: 3 },
              }}
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

              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                paddingRight={2}
              >
                <div
                  sx={{ marginBottom: "48px" }}
                  style={
                    smallMatches
                      ? { width: "100%" }
                      : matches
                      ? { width: "80%" }
                      : { width: "60%" }
                  }
                >
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
                <div
                  style={
                    smallMatches
                      ? { width: "100%" }
                      : matches
                      ? { width: "80%" }
                      : { width: "60%" }
                  }
                >
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
                    alignItems="center"
                    sx={{ margin: "0 24px" }}
                  >
                    <Grid item xs={3}>
                      <FormControl sx={{ width: { xs: "10rem", md: "15rem" } }}>
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
                        >
                          {allergicIngredients.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{ marginLeft: { xs: "6rem", md: "3rem" } }}
                    >
                      <Button
                        className={classes.addButton} // Apply custom styles
                        sx={{
                          height: "3.4rem",
                          width: "auto",
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
                </div>
              </Box>

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
      </Container>
    </CssBaseline>
  );
}
