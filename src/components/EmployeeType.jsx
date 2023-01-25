import { Typography, Button } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function EmployeeType({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userName, userId, direction } = data;
  const [type, setType] = useState(0);

  const disableStyle = {
    backgroundColor: "lightgrey",
    color: "grey",
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography className="text-center " style={{ fontWeight: "bold" }}>
          ,שלום {userName}
        </Typography>
        <Typography className="text-center" style={{ direction: direction }}>
          זהו טופס הדיווח החודשי, המשמש את "ספק האשראי " לצורך ניהול החזר המימון
          החברתי במסגרת "שם התוכנית "
        </Typography>
        <Typography className="text-center mt-4">
          : יש למלא את הטופס בהתאם למצבך התעסוקתי
        </Typography>
        <div class="flex flex-row flex-wrap gap-2 items-center justify-center mt-4">
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700  "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 0 ? "lightgrey" : "white",
              color: type === 0 ? "grey" : "blue",
              border: !(type === 0) && "1px solid blue",
            }}
            onClick={() => setType(0)}
          >
            עצמאי
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 1 ? "lightgrey" : "white",
              color: type === 1 ? "grey" : "blue",
              border: !(type === 1) && "1px solid blue",
            }}
            onClick={() => setType(1)}
          >
            שכיר
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 2 ? "lightgrey" : "white",
              color: type === 2 ? "grey" : "blue",
              border: !(type === 2) && "1px solid blue",
            }}
            onClick={() => setType(2)}
          >
            שכיר/ה+עצמאי/ית
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700 w-2/5 "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 3 ? "lightgrey" : "white",
              color: type === 3 ? "grey" : "blue",
              border: !(type === 3) && "1px solid blue",
            }}
            onClick={() => setType(3)}
          >
            לא מועסק/ת
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-700 flex flex-row self-start "
          variant="contained"
          sx={{ direction: direction }}
        >
          אפשר להמשיך
          <KeyboardBackspaceIcon />
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
    </>
  );
}