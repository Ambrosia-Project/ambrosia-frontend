import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    ThemeProvider,
    createTheme
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo512.png";
import CustomSnackbar from "../components/Snackbar";
import authService from "../services/auth.service";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
});

export default function RegisterInformationPage({ update, setUpdate }) {
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:1020px)");
    const [loading, setLoading] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState("info");

    const history = useHistory();

    useEffect(() => {
        return () => {
            // Cancel any ongoing asynchronous tasks here
        };
    }, []);

    const handlePasswordConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = localStorage.getItem("email");

        const user = {
            email: email,
            code: confirmationCode,
        };

        try {
            const res = await authService.checkUserConfirmationCode(user);
            console.log(res);

            if (res?.status === 200) {
                setSnackbarMessage("Confirmation code is correct");
                setSnackbar(true);
                setSeverity("success");

                history.push("/updatePassword/");

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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handlePasswordConfirm(e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                                    style={{ width: '45%', height: '45%' }}
                                />
                            </Grid>

                            <Grid className={classes.inputGrid}>
                                <label className={classes.label}>Confirmation Code</label>
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
                                    placeholder="Ex: 111111 (6-digit code)"
                                    fullWidth
                                    required
                                    onChange={(email) => setConfirmationCode(email.target.value)}
                                />

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
                                            if (confirmationCode === "") {
                                                setSnackbarMessage("Please enter your confirmation code");
                                                setSnackbar(true);
                                            } else {
                                                handlePasswordConfirm(e);
                                            }
                                        }}
                                        onKeyDown={handleKeyPress}
                                    >
                                        Continue
                                    </Button>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </Container>
            </CssBaseline>
        </ThemeProvider>
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