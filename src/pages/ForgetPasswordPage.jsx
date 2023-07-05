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
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo512.png";
import CustomSnackbar from "../components/Snackbar";
import authService from "../services/auth.service";


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  }
});

export default function RegisterInformationPage({ update, setUpdate }) {

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1020px)');
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("info");

  const history = useHistory();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      email: email,
    }

    try {
      const res = await authService.forgetPassword(user);

      if (res?.status === 200) {
        setSnackbarMessage("Please check your email for the verification code");
        setSnackbar(true);
        setSeverity("success");
        localStorage.setItem("email", email);
        history.push("/forgetPassword/confirmUser");
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
        handleForgetPassword(e);
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
                <h2 className={classes.title}>Reset Password</h2>
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
                  type="email"
                  placeholder="example@test.com"
                  fullWidth
                  required
                  onChange={(email) => setEmail(email.target.value)}
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
                      } else {
                        handleForgetPassword(e);
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