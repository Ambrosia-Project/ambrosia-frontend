import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Container,
  Grid,
  Paper,
  CssBaseline,
  IconButton,
  Button,
  Box,
  TextField,
  useMediaQuery,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  profilePictureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    border: `2px solid #5e714e`,
    [theme.breakpoints.up("sm")]: {
      width: 200,
      height: 200,
    },
  },
  paperContainer: {
    padding: theme.spacing(6),
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between",
      marginTop: theme.spacing(4),
    },
  },
  sectionLabel: {
    flexBasis: "100%",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      flexBasis: "30%",
      textAlign: "left",
      marginBottom: 0,
      marginRight: theme.spacing(2),
    },
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  sectionValue: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: `2px solid #5e714e`,
    [theme.breakpoints.up("sm")]: {
      flexBasis: "70%",
      justifyContent: "space-between",
    },
  },
  editIcon: {
    fontSize: 8,
  },
  saveButton: {
    marginTop: theme.spacing(4),
    backgroundColor: "#5e714e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4a5f40",
    },
    "&:active": {
      backgroundColor: "#3a4932",
    },
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
}));

const Profile = () => {
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [allergicTo, setAllergicTo] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState("");

  const [editing, setEditing] = useState({
    username: false,
    age: false,
    allergicTo: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
      setUsername(user.name);
      setAge(user.age.toString());
      setAllergicTo(user.allergies.join(", "));
    }
  };

  const handleEdit = (section) => {
    setEditing((prevState) => ({
      ...prevState,
      [section]: true,
    }));
  };

  const handleAllergenChange = (event) => {
    setSelectedAllergen(event.target.value);
  };

  const handleInputChange = (event, section) => {
    const value = event.target.value;

    switch (section) {
      case "username":
        setUsername(value);
        break;
      case "age":
        setAge(value);
        break;
      case "allergicTo":
        setAllergicTo(value);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = () => {
    const updatedUserInfo = {
      email: email,
      age: parseInt(age),
      name: username,
      allergies: allergicTo.split(",").map((item) => item.trim()),
    };

    localStorage.setItem("user", JSON.stringify(updatedUserInfo));

    setEditing({
      username: false,
      age: false,
      allergicTo: false,
    });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <CssBaseline>
      <Container maxWidth={isSmallScreen ? "xs" : isMediumScreen ? "sm" : "md"}>
        <Grid container spacing={isSmallScreen ? 2 : 4}>
          <Grid item xs={12} md={isSmallScreen ? 6 : 12}>
            <Paper elevation={3} className={classes.paperContainer}>
              <div className={classes.profilePictureContainer}>
                <Avatar
                  className={classes.profilePicture}
                  src="/path/to/avatar.jpg"
                />
              </div>
              <Grid item xs={12} className={classes.sectionContainer}>
                <Typography variant="h6" className={classes.sectionLabel}>
                  Email
                </Typography>
                <div className={classes.sectionValue}>
                  <Typography variant="body1">{email}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} className={classes.sectionContainer}>
                <Typography variant="h6" className={classes.sectionLabel}>
                  Username
                </Typography>
                {editing.username ? (
                  <TextField
                    value={username}
                    onChange={(event) => handleInputChange(event, "username")}
                  />
                ) : (
                  <div className={classes.sectionValue}>
                    <Typography variant="body1">{username}</Typography>
                    <IconButton onClick={() => handleEdit("username")}>
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} className={classes.sectionContainer}>
                <Typography variant="h6" className={classes.sectionLabel}>
                  Age
                </Typography>
                {editing.age ? (
                  <TextField
                    value={age}
                    onChange={(event) => handleInputChange(event, "age")}
                  />
                ) : (
                  <div className={classes.sectionValue}>
                    <Typography variant="body1">{age}</Typography>
                    <IconButton onClick={() => handleEdit("age")}>
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} className={classes.sectionContainer}>
                <Typography variant="h6" className={classes.sectionLabel}>
                  Most Allergic To
                </Typography>
                <FormControl>
                  <InputLabel id="allergen-label">Allergens</InputLabel>
                  <Select
                    labelId="allergen-label"
                    id="allergen-select"
                    value={selectedAllergen}
                    onChange={handleAllergenChange}
                  >
                    {allergicTo.split(", ").map((allergen) => (
                      <MenuItem key={allergen} value={allergen}>
                        {allergen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Box className={classes.saveButtonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.saveButton}
                  onClick={handleSaveChanges}
                  sx={{ textTransform: "none" }}
                >
                  Save Changes
                </Button>
              </Box>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
};

export default Profile;
