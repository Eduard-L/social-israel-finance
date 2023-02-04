import { Typography, Button } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useState } from "react";
import { EMPLOYMENT_STATUS } from "../Interface/EmploymentStatus"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function EmployeeType({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, employeeInfo } = data;
  const [type, setType] = useState(employeeInfo.employmentStatus ?? 'שכיר');

  const handleNextStep = () => {
    employeeInfo.employmentStatus = type
    setData({ ...data });
    if (type === EMPLOYMENT_STATUS.Not_Employed) {
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
              backgroundColor: type === EMPLOYMENT_STATUS.Independent ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Independent ? "grey" : "#4091df",
              border: !(type === EMPLOYMENT_STATUS.Independent) && "2px solid #4091df",
            }}
            onClick={() => setType(EMPLOYMENT_STATUS.Independent)}
          >
            עצמאי
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === EMPLOYMENT_STATUS.Employee ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Employee ? "grey" : "#4091df",
              border: !(type === EMPLOYMENT_STATUS.Employee) && "2px solid #4091df",
            }}
            onClick={() => setType(EMPLOYMENT_STATUS.Employee)}
          >
            שכיר
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === EMPLOYMENT_STATUS.Combined ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Combined ? "grey" : "#4091df",
              border: !(type === EMPLOYMENT_STATUS.Combined) && "2px solid #4091df",
            }}
            onClick={() => setType(EMPLOYMENT_STATUS.Combined)}
          >
            שכיר/ה+עצמאי/ית
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700 w-2/5 "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor: type === EMPLOYMENT_STATUS.Not_Employed ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Not_Employed ? "grey" : "#4091df",
              border: !(type === EMPLOYMENT_STATUS.Not_Employed) && "2px solid #4091df",
            }}
            onClick={() => {
              setType(EMPLOYMENT_STATUS.Not_Employed);
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
