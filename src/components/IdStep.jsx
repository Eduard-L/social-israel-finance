import { TextField, Typography } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

export function IdStep({ onBtnClick, id, setId }) {
  const { data, setData } = useContext(DataContext);
  const { isEnglish, direction } = data;

  return (
    <>
      <div className="flex flex-row ">
        <Button
          className="rounded-full bg-blue-700"
          sx={{
            width: 110,
            transform: "translate(10px, 0px)",
          }}
          style={{
            backgroundColor: !isEnglish ? "lightgrey" : "",
            color: !isEnglish ? "grey" : "",
            zIndex: !isEnglish ? "0" : "1",
            height: !isEnglish ? "" : "95%",
          }}
          variant="contained"
          onClick={() =>
            setData({ ...data, isEnglish: true, direction: "ltr" })
          }
        >
          English
        </Button>
        <Button
          className=" rounded-full bg-blue-700 "
          variant="contained"
          sx={{ width: 110, transform: "translate(-10px, 0px)" }}
          onClick={() =>
            setData({ ...data, isEnglish: false, direction: "rtl" })
          }
          style={{
            backgroundColor: isEnglish ? "lightgrey" : "",
            color: isEnglish ? "grey" : "",
            height: isEnglish ? "95%" : "",
          }}
        >
          עברית
        </Button>
      </div>
      <div
        className="flex flex-col text-center justify-between"
        style={{ width: 250, direction: direction, height: 100 }}
      >
        <Typography variant="subtitle2">
          לקבל קוד אימות אישי בסמס לצורך כניסה לטופס הדיווח החודשי, יש להכניס
          מספר תעודת זהות :
        </Typography>

        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          value={id}
          error={id.length !== 9 && id.length > 0}
          helperText={
            id.length !== 9 && id.length > 0 && "נא מלא תעודת זהות תקינה"
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {id.length === 9 ? (
                  <DoneIcon style={{ color: "green" }} />
                ) : id.length === 0 ? (
                  " "
                ) : (
                  <ErrorIcon style={{ color: "red" }} />
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setId(e.target.value);
            }
          }}
        />
      </div>
      <Button
        className=" rounded-full bg-blue-700 flex flex-row self-start "
        variant="contained"
        sx={{ direction: direction }}
        disabled={id.length !== 9}
        onClick={onBtnClick}
      >
        קבלת קוד אימות אישי
        <KeyboardBackspaceIcon />
      </Button>
    </>
  );
}
