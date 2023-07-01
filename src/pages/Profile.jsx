import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


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
    marginTop: theme.spacing(2),
    padding: "3% 7%"
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
    width: "100%",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: `2px solid #5e714e`,
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

const allergicTo = [
  "Milk",
  "Eggs",
  "Fish",
]

const Profile = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  //const [allergicTo, setAllergicTo] = useState("");
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
      //setAllergicTo(user.allergies.join(", "));
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
        //setAllergicTo(value);
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
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.paperContainer}>
          <Avatar
            className={classes.profilePicture}
            src="/path/to/avatar.jpg"
            sx={{
              margin: "5% auto",
            }}
          />
          <Grid container sx={{ padding: '3% 7%' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <Typography variant="h6">
                Email
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                sx={{
                  "& .MuiFilledInput-underline: before": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiFilledInput-underline: after": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#5e714e",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    color: "#5e714e",
                  },
                }}
                margin="dense"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <Typography variant="h6">
                Name
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                sx={{
                  "& .MuiFilledInput-underline: before": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiFilledInput-underline: after": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#5e714e",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    color: "#5e714e",
                  },
                }}
                margin="dense"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <Typography variant="h6">
                Age
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                sx={{
                  "& .MuiFilledInput-underline: before": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiFilledInput-underline: after": {
                    borderBottomColor: "#5e714e",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#5e714e",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    color: "#5e714e",
                  },
                }}
                margin="dense"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <Typography variant="h6">
                Most Allergic To
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ minWidth: 120, marginTop: "5px" }}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={allergicTo}
                  >
                    {allergicTo.map((ingredient) => (
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        {ingredient}
                      </ListItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="add"
                onClick={() => {
                  console.log("add");
                }}
              >
                <AddCircleOutlineIcon sx={{ fontSize: '2.5rem', textAlign: 'center' }} />
              </IconButton>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                size='large'
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
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
};

export default Profile;
