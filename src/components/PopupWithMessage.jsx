import { Snackbar, Alert } from "@mui/material";

export function PopupWithMessage({ handleClose, popupMessageProps }) {
  const { isOpen, message, type } = popupMessageProps;
  console.log(isOpen);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      onClose={handleClose}
      message={message}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
