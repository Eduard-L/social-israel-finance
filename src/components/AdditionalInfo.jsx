import { Typography, TextareaAutosize, Button } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function AdditionalInfo() {
  const { data, step, setStep } = useContext(DataContext);
  const { direction } = data;

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="w-full ">
        <Typography className="text-center">:הערות נוספות</Typography>
        <TextareaAutosize
          aria-label="empty textarea"
          className="w-full mt-3 p-4 "
          style={{
            height: 280,
            border: "1px solid #d0d0d0",
            direction: direction,
            resize: "none",
          }}
        />
      </div>
      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-700 flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
          onClick={() => {
            console.log(data);
            alert("info is sent");
          }}
        >
          שליחת דיווח
        </Button>
        <Button
          className=" rounded-full flex flex-row self-start bg-blue-700  "
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
    </div>
  );
}
