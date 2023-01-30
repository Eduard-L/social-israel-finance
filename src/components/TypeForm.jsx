import { Typography, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
export function TypeForm({}) {
  const { data, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone, employeeType } = data;

  useEffect(() => {
    if (employeeType === 3) {
      setStep(step - 1);
    }
  }, []);

  const type =
    employeeType === 1
      ? "שכיר"
      : employeeType === 0
      ? "עצמאי"
      : employeeType === 2
      ? "שכיר + עצמאי"
      : " לא מועסק";
  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-row"
        style={{ fontWeight: "bold", direction: direction }}
      >
        <Typography
          className="text-start ml-1"
          style={{ fontWeight: "bold", direction: direction }}
        >
          ישראל ישראל |
        </Typography>
        <Typography
          className="text-start"
          style={{ fontWeight: "bold", direction: direction, color: "blue" }}
        >
          {type}
        </Typography>
      </div>
    </div>
  );
}
