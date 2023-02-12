import { Typography, Button, TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import { SharedFields } from "./SharedFields";
import { useState } from "react";

export function SelfEmployee({ employeeForm, setEmployeeForm }) {
  const { data, setStep } = useContext(DataContext);
  const { direction, employeeInfo } = data;

  const [monthSalary, setMonthSalary] = useState(
    employeeInfo.monthSalary ?? ""
  );

  return (
    <div
      className="flex flex-col justify-between w-full"
      style={{ direction: direction, height: "60%" }}
    >
      <SharedFields
        employeeForm={employeeForm}
        setEmployeeForm={setEmployeeForm}
        isSelfEmployee={true}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-4"
        value={monthSalary || ""}
        required
        placeholder="הכנסות עבודה מחודש קודם"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              ₪
              {monthSalary?.length > 0 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : monthSalary?.length === 0 ? (
                " "
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            setEmployeeForm({ ...employeeForm, monthSalary: e.target.value });
            setMonthSalary(e.target.value);
          }
        }}
      />
    </div>
  );
}
