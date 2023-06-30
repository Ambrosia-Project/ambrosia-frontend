import React, { useState } from "react";
import { Avatar, Typography, Box, CssBaseline } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@emotion/react";

// const useStyles = makeStyles({
//   addButton: {
//     backgroundColor: "#5e714e",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "#4a5f40",
//     },
//     "&:active": {
//       backgroundColor: "#3a4932",
//     },
//   },
//   saveButton: {
//     marginTop: "96px",
//     backgroundColor: "#5e714e",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "#4a5f40",
//     },
//     "&:active": {
//       backgroundColor: "#3a4932",
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    width: 200,
    height: 200,
    margin: "0 auto",
    marginTop: theme.spacing(4),
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
  },
  sectionValue: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
}));

export default function Profile() {
  const classes = useStyles();
  return (
    <CssBaseline>
      <ThemeProvider></ThemeProvider>
    </CssBaseline>
  );
}
