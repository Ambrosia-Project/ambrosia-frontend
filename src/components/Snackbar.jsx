import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from "@mui/material";

export default function CustomSnackbar({
  snackbar,
  setSnackbar,
  snackbarMessage,
  severity,
  autoHideDuration = 6000,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  return (
    <Snackbar
      open={snackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={severity}>
        {snackbarMessage}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
}
