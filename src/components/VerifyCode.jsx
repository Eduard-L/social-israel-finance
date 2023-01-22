import { Typography, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function VerifyCode({}) {
  const { data, setData } = useContext(DataContext);
  const { direction } = data;
  return (
    <div className="flex flex-col justify-between h-2/3">
      <div className="flex flex-col">
        <Typography variant="subtitle2">blalalalal</Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          error=""
        />
      </div>
      <div className="flex flex-row">
        <Button
          className=" rounded-full bg-blue-700 flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
        >
          קבלת קוד אימות אישי
          <KeyboardBackspaceIcon />
        </Button>
        <Button
          className=" rounded-full flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
        >
          קבלת קוד אימות אישי
          <KeyboardBackspaceIcon />
        </Button>
      </div>
    </div>
  );
}
