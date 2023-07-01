import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import caesar from "../assets/images/caesar.png";

import { makeStyles } from "@mui/styles";
import authService from "../services/auth.service";

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
    padding: "3% 7%",
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

const Profile = () => {
  const classes = useStyles();

  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [allergicTo, setAllergicTo] = useState([]);

  const inputFileRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
      setUsername(user.name);
      setAge(user.age);
      setAllergicTo(user.allergies);
      setImage(user.image);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAddAllergy = () => {
    window.location.href = "/profile/addAllergy";
  };

  const handleSaveChanges = () => {
    const user = {
      image: image,
      email: email,
      name: username,
      age: age,
      allergies: allergicTo,
      role: JSON.parse(localStorage.getItem("user")).role,
    };
    console.log(user.image);
    authService.updateProfile(user).then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/profile";
      }
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    convertToBase64(file)
      .then((res) => {
        console.log(res);
        setImage(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePhotoChange = () => {
    inputFileRef.current.click();
  };

  const handleDeleteAllegrgy = (allergy) => {
    setAllergicTo(allergicTo.filter((item) => item !== allergy));
  };
  return (
    <CssBaseline>
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.paperContainer}>
          <Avatar
            className={classes.profilePicture}
            src={image}
            sx={{
              margin: "5% auto",
            }}
          />

          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
            accept="image/*"
          />
          <IconButton
            sx={{
              position: "relative",
              bottom: "70px",
              left: "55%",
              background: "#5E714E",
              "&:hover": { background: "#4E613E" },
            }}
            onClick={handlePhotoChange}
          >
            <AddAPhotoIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Grid container sx={{ padding: "3% 7%" }}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Typography variant="h6">Email</Typography>
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
                value={email}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Typography variant="h6">Name</Typography>
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
                type="text"
                value={username}
                fullWidth
                required
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Typography variant="h6">Age</Typography>
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
                value={age}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Typography variant="h6">Most Allergic To</Typography>
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
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteAllegrgy(ingredient)}
                          >
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
                  window.location.href = "/addAllergies";
                }}
              >
                <AddCircleOutlineIcon
                  sx={{ fontSize: "2.5rem", textAlign: "center" }}
                />
              </IconButton>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.saveButton}
                onClick={handleSaveChanges}
                sx={{ textTransform: "none" }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
};

export default Profile;
