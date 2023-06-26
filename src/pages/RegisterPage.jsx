import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Divider,
    Grid,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import { makeStyles } from '@mui/styles';
  import React from "react";
  import { useHistory } from "react-router-dom";
  import logo from "../assets/images/logo512.png";
  import CustomSnackbar from "../components/Snackbar";
  import SessionHelper from "../helpers/SessionHelper";
  import authService from "../services/auth.service";
  import useMediaQuery from '@mui/material/useMediaQuery';
  
  
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    }
  });
  
  export default function Register({ update, setUpdate }) {
  
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1020px)');
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [snackbar, setSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("info");
    const history = useHistory();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      history.push("/register/info");
      // setLoading(true);
      // const res = await authService.login(email, password);
      // if (res?.status === 200) {
      //   let data = res?.data;
      //   console.log(data);
      //   const res2 = await authService.synchDatabase(data);
      //   const data2 = res2.data;
      //   const user = { ...data2.userData, roles: data2.roles };
      //   console.log(user);
      //   SessionHelper.setUser(user);
      //   setUpdate(!update);
      //   history?.location?.state
      //     ? history.push(history?.location?.state?.from?.pathname)
      //     : history.push("/dashboard");
      //   setLoading(false);
      // } else {
      //   setSnackbarMessage(res?.data?.error?.message);
      //   setSnackbar(true);
      //   setSeverity("error");
      // }
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
                  <h2 className={classes.title}>Sign Up</h2>
                </Grid>

                <Typography className={classes.signUp}>
                  Already registered? Log in{" "}
                  <a href="/signup" style={{ color: "#8f8e8e", fontWeight: "bold", fontSize:"1rem" }}>
                    here
                  </a>
                </Typography>


                <Grid className={classes.inputGrid}>
                  <label className={classes.label}>Email</label>
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
                    label="finally lunch"
                    type="email"
                    fullWidth
                    required
                    onChange={(email) => setEmail(email.target.value)}
                  />
                  <label className={classes.label}>Password</label>
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
                    label="party time"
                    type="password"
                    fullWidth
                    required
                    onChange={(password) => setPassword(password.target.value)}
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
                        if (email === "") {
                          setSnackbarMessage("Please enter your email");
                          setSnackbar(true);
                        } else if (password === "") {
                          setSnackbarMessage("Please enter your password");
                          setSnackbar(true);
                        } else {
                          handleLogin(e);
                        }
                      }}
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