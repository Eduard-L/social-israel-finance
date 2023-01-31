import { Typography, Button } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function EmployeeType({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, employeeInfo } = data;
  const [type, setType] = useState(employeeInfo?.employeeType ?? 0);

  const handleNextStep = () => {
    setData({ ...data, employeeType: type });
    if (type === 3) {
      setStep(step + 2);
    } else {
      setStep(step + 1);
    }
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
        <div className="flex flex-row flex-wrap gap-2 items-center justify-center mt-4">
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700  "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 0 ? "lightgrey" : "white",
              color: type === 0 ? "grey" : "blue",
              border: !(type === 0) && "2px solid #4091df",
            }}
            onClick={() => setType(0)}
          >
            עצמאי
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 1 ? "lightgrey" : "white",
              color: type === 1 ? "grey" : "#4091df",
              border: !(type === 1) && "2px solid #4091df",
            }}
            onClick={() => setType(1)}
          >
            שכיר
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === 2 ? "lightgrey" : "white",
              color: type === 2 ? "grey" : "#4091df",
              border: !(type === 2) && "2px solid #4091df",
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
              color: type === 3 ? "grey" : "#4091df",
              border: !(type === 3) && "2px solid #4091df",
            }}
            onClick={() => {
              setType(3);
              setData({ ...data, employeeForm: null });
            }}
          >
            לא מועסק/ת
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          style={{ direction: direction }}
          onClick={() => handleNextStep()}
        >
          אפשר להמשיך
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
