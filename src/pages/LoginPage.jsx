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
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo512.png";
import CustomSnackbar from "../components/Snackbar";
import SessionHelper from "../helpers/SessionHelper";
import authService from "../services/auth.service";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#5E714E",
    },
  },
});

export default function LoginPage({ update, setUpdate }) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1020px)");
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("info");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    console.log(password);
    const res = await authService.login(user);
    console.log(res);
    if (res?.status === 200) {
      SessionHelper.setUser(res?.data);
      setUpdate(!update);
      history?.location?.state
        ? history.push(history?.location?.state?.from?.pathname)
        : history.push("/dashboard");
    } else {
      setSnackbarMessage(res?.data?.message);
      setSnackbar(true);
      setSeverity("error");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
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
              className={
                matches ? classes.paperStyle : classes.paperStyleMobile
              }
            >
              <Grid align="center">
                <img
                  alt="ambrosia logo"
                  src={logo}
                  style={{ width: "45%", height: "45%" }}
                />
                <h2 className={classes.title}>Log In</h2>
              </Grid>
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
                  onKeyDown={handleKeyPress}
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
                  onKeyDown={handleKeyPress}
                />
              </Grid>
              <Typography className={classes.signUp}>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  style={{
                    color: "#8f8e8e",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Sign up
                </a>
              </Typography>
              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <a
                href="/forgetPassword"
                style={{
                  color: "#8f8e8e",
                  fontWeight: "normal",
                  fontSize: "1rem",
                }}
              >
                Forgot your password?
              </a>
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
                    I'm Hungry!
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
  },
});
