import { Typography, Button, TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import { SharedFields } from "./SharedFields";

export function SelfEmployee({ employeeForm, setEmployeeForm }) {
  const { data, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone, employeeType } = data;
  const { jobTitle, startMonth, monthSalary } = employeeForm;

  return (
    <div
      className="flex flex-col justify-between w-full"
      style={{ direction: direction, height: "60%" }}
    >
      <SharedFields
        employeeForm={employeeForm}
        setEmployeeForm={setEmployeeForm}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-6"
        value={monthSalary}
        error={monthSalary?.length < 3 && monthSalary.length > 0}
        helperText={
          monthSalary?.length !== 1 &&
          monthSalary?.length > 1 &&
          "נא מלא הכנסות מעבודה חודש קודם"
        }
        placeholder="הכנסות עבודה מחודש קודם"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {monthSalary?.length > 3 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setEmployeeForm({ employeeForm, monthSalary: e.target.value });
        }}
      />
    </div>
  );
}
