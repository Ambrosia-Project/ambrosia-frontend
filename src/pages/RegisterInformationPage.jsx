import {
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo512.png";
import CustomSnackbar from "../components/Snackbar";
import authService from "../services/auth.service";
import allergiesService from "../services/allergies.service";

const allergies = [
    "Milk",
    "Eggs",
    "Fish",
    "Crustacean shellfish",
    "Tree nuts",
];

export default function RegisterInformationPage({ update, setUpdate }) {
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:1020px)");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const [ingredientsList, setIngredientsList] = useState([]); // from user
    const [allergicIngredients, setAllergicIngredients] = useState([]); // from database

    const history = useHistory();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (email === null || password === null) {
            setSnackbarMessage("Please enter your email and password before this step!");
            setSnackbar(true);
            setSeverity("error");
            setLoading(false);
            return;
        }

        const user = {
            email: email,
            password: password,
            name: name,
            age: age,
            allergies: ingredientsList,
        };

        try {
            const res = await authService.register(user);
            console.log(res);
            if (res?.status === 200) {
                let data = res?.data;
                setSnackbarMessage("Sign up successfully! Please log in to continue.");
                setSnackbar(true);
                setSeverity("success");

                history.push("/login");
            } else {
                setSnackbarMessage(res?.data?.message);
                setSnackbar(true);
                setSeverity("error");
            }
        } catch (error) {
            console.error(error);
            // Handle any error, e.g., show an error snackbar
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setIngredientsList(event.target.value);
    };

    return (
        <CssBaseline>
            <Container fluid>
                <Grid align="center">
                    <CustomSnackbar
                        snackbar={snackbar}
                        setSnackbar={setSnackbar}
                        snackbarMessage={snackbarMessage}
                        severity={severity}
                    />
                    <Paper
                        elevation={3}
                        className={matches ? classes.paperStyle : classes.paperStyleMobile}
                    >
                        <Grid align="center">
                            <img
                                alt="ambrosia logo"
                                src={logo}
                                style={{ width: "45%", height: "45%" }}
                            />
                        </Grid>

                        <Grid className={classes.inputGrid}>
                            <label className={classes.label}>Name</label>
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
                                fullWidth
                                required
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label className={classes.label}>Age</label>
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
                                onChange={(event) => setAge(event.target.value)}
                            />
                            <label className={classes.label}>Most Allergic Ingredients</label>
                            <Box sx={{ minWidth: 120, marginTop: "5px" }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        multiple
                                        value={ingredientsList}
                                        onChange={handleChange}
                                    >
                                        {console.log(allergicIngredients.length)}
                                        {
                                        allergicIngredients !== 0 && <MenuItem key={"None"} value={"None"}>
                                            {"None"}
                                        </MenuItem>
                                        }
                                        {allergicIngredients.map((ingredient) => (
                                            <MenuItem key={ingredient} value={ingredient}>
                                                {ingredient}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <div className={classes.buttonContainer}>
                            {loading ? (
                                <CircularProgress style={{ color: "#999" }} />
                            ) : (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor: "#5e714e",
                                        "&: hover": {
                                            backgroundColor: "#6e815e",
                                        },
                                        "&:active": {
                                            backgroundColor: "#5e714e",
                                        },
                                        fontSize: "15px",
                                        marginTop: 5,
                                    }}
                                    fullWidth
                                    onClick={(e) => {
                                        if (name === "") {
                                            setSnackbarMessage("Please enter your name");
                                            setSnackbar(true);
                                        } else if (age === "" || isNaN(parseInt(age))) {
                                            setSnackbarMessage("Please enter your age");
                                            setSnackbar(true);
                                        } else {
                                            handleLogin(e);
                                        }
                                    }}
                                >
                                    I'm Hungry!
                                </Button>
                            )}
                        </div>
                    </Paper>
                </Grid>
            </Container>
        </CssBaseline>
    );
}

const useStyles = makeStyles({
    paperStyle: {
        padding: "3% 5%",
        width: "35%",
        margin: "5% auto",
    },
    paperStyleMobile: {
        padding: "3% 5%",
        width: "80%",
        margin: "5% auto",
    },
    title: {
        color: "#505050",
        fontSize: "1.5rem",
        fontWeight: "lighter",
        marginTop: "10%",
    },
    label: {
        display: "block",
        width: "100%",
        color: "#505050",
        textAlign: "left",
        fontSize: "1rem",
        margin: "3% 0 0",
    },
    altText: {
        color: "#505050",
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: 10,
    },
    inputGrid: {
        marginTop: 20,
        borderRadius: 20,
    },
    buttonContainer: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bolder",
    },
    signUp: {
        color: "#505050",
        fontSize: "1rem",
        marginTop: 45,
    }
});