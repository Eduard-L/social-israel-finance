import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import { translationsObj } from "../../helpers/translations";

export function IdStep({ onBtnClick, id, setId, method, setMethod }) {
  const { data, setData, isLoading } = useContext(DataContext);
  const { isEnglish, direction, translation } = data;

  return (
    <>
      <div className="flex flex-row ">
        <Button
          className="rounded-full bg-blue-500"
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
            setData({
              ...data,
              isEnglish: true,
              direction: "ltr",
              translation: translationsObj["en"],
            })
          }
        >
          English
        </Button>
        <Button
          className=" rounded-full bg-blue-500 "
          variant="contained"
          sx={{ width: 110, transform: "translate(-10px, 0px)" }}
          onClick={() =>
            setData({
              ...data,
              isEnglish: false,
              direction: "rtl",
              translation: translationsObj["he"],
            })
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
        className="flex flex-col text-center justify-between "
        style={{ width: 250, direction: direction }}
      >
        <Typography variant="subtitle2">{translation.pageOneTitle}</Typography>

        <TextField
          id="standard-basic"
          variant="standard"
          className="mt-2"
          type="text"
          value={id}
          error={id.length !== 9 && id.length > 0}
          helperText={
            id.length !== 9 &&
            id.length > 0 &&
            `${translation.validationIdError}`
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

        <RadioGroup
          className="flex flex-row mt-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <FormControlLabel
            value="WhatsApp"
            control={<Radio />}
            label="WhatsApp"
            disabled={isLoading}
          />
          <FormControlLabel
            disabled={isLoading}
            value="Sms"
            control={<Radio />}
            label="Sms"
          />
        </RadioGroup>
      </div>
      <Button
        className=" rounded-full bg-blue-500 self-start text-start "
        variant="contained"
        style={{ direction: "rtl" }}
        disabled={id.length !== 9 || isLoading}
        onClick={() => onBtnClick()}
      >
        {translation.getPersonalVerCode}
        <KeyboardBackspaceIcon />
      </Button>
    </>
  );
}
