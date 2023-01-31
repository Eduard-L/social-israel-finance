import { TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";

export function SharedFields({ employeeForm, setEmployeeForm }) {
  const { data, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone, employeeType } = data;
  const { jobTitle, startMonth, monthSalary, companyName } = employeeForm;

  return (
    <div className="w-full">
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-6 w-full"
        value={jobTitle}
        error={jobTitle?.length < 3 && jobTitle.length > 0}
        helperText={
          jobTitle?.length !== 1 && jobTitle?.length > 1 && "נא מלא שם תפקיד"
        }
        placeholder="שם תפקיד"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {jobTitle?.length > 3 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setEmployeeForm({ employeeForm, jobTitle: e.target.value });
        }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-6 w-full"
        value={startMonth}
        error={startMonth?.length < 3 && startMonth.length > 0}
        helperText={
          startMonth?.length !== 1 &&
          startMonth?.length > 1 &&
          "חודש תחילת עבודה"
        }
        placeholder="חודש תחילת עבודה"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {startMonth?.length > 3 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setEmployeeForm({ employeeForm, startMonth: e.target.value });
        }}
      />
    </div>
  );
}
