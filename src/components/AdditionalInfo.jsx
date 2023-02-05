import { Typography, TextareaAutosize, Button } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import { api } from "../api/Api";

export function AdditionalInfo() {
  const { data, step, setStep, setData } = useContext(DataContext);
  const { direction } = data;
  const [text, setText] = useState(data.additionText ?? "");

  const handleSendAllInfo = async (finalInfo) => {
    console.log(finalInfo);

    const response = await api.handleSubmit(finalInfo, finalInfo.files, finalInfo.userId)
    //final request to the server
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="w-full ">
        <Typography className="text-center">:הערות נוספות</Typography>
        <TextareaAutosize
          aria-label="empty textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mt-3 p-4 "
          style={{
            height: 280,
            border: "2px solid #d0d0d0",
            direction: direction,
            resize: "none",
          }}
        />
      </div>
      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
          onClick={() => {
            setData(() => {
              return { ...data, additionText: text };
            });
            // alert("info is sent");
            console.log(data);
            handleSendAllInfo({ ...data, additionText: text });
            setStep(step + 1);
          }}
        >
          שליחת דיווח
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
    </div>
  );
}
