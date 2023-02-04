import { Typography, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import { InputAdornment } from "@material-ui/core";

export function VerifyCode({ onSendCode, onSmsSend }) {
  const { data, setStep, step, isLoading } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone } = data;
  const [code, setCode] = useState("");
  const message = `הודעת טקסט נשלחה אלייך למס `;

  return (
    <>
      <div className="flex flex-col" style={{}}>
        <Typography className="text-center" style={{ fontWeight: "bold" }}>
          ,שלום {userName}
        </Typography>
        <div className="flex flex-col">
          <Typography className="text-center" style={{}}>
            {message}
          </Typography>
          <Typography
            className="text-center underline "
            style={{ color: "blue" }}
          >
            {hiddenPhone}
          </Typography>
        </div>
        <Typography className="text-center" style={{}}>
          יש להכניס את מס' האימות האישי שקיבלת
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          value={code}
          style={{ direction: direction }}
          className="mt-6"
          error={code.length !== 6 && code.length > 0}
          helperText={code.length !== 6 && code.length > 0 && "נא למלא מס אישי"}
          placeholder="מספר אישי"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {code.length === 6 ? (
                  <DoneIcon style={{ color: "green" }} />
                ) : code.length === 0 ? (
                  " "
                ) : (
                  <ErrorIcon style={{ color: "red" }} />
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setCode(e.target.value);
            }
          }}
        />
        <span
          className="text-center underline font-bold text-sm "
          style={{
            direction: direction,
            marginTop: (code.length === 6 || code.length === 0) && "24px",
            cursor: "pointer",
          }}
          onClick={() => {
            onSmsSend(true);
          }}
        >
          לא קיבלתי שלחו שוב
        </span>
      </div>
      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
          disabled={code.length !== 6 || isLoading}
          onClick={() => onSendCode(code)}
        >
          כניסה לטופס
          <KeyboardBackspaceIcon />
        </Button>
        <Button
          className=" rounded-full flex flex-row self-start bg-blue-500  "
          variant="contained"
          style={{
            direction: direction,
            transform: `rotate(180deg)`,
          }}
          onClick={() => setStep(step - 1)}
        >
          <KeyboardBackspaceIcon />
        </Button>
      </div>
    </>
  );
}
