import { TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

export function SharedFields({
  employeeForm,
  setEmployeeForm,
  isSelfEmployee,
}) {
  const { data } = useContext(DataContext);
  const {
    jobTitleSelfEmployee,
    jobTitleContractEmployee,
    startMonthSelfEmployee,
    startMonthContractEmployee,
    monthSalary,
    companyName,
  } = employeeForm;

  const [jobTitle, setJobTitle] = useState(() =>
    isSelfEmployee ? jobTitleSelfEmployee : jobTitleContractEmployee
  );
  const [startMonth, setStartMonth] = useState(() =>
    isSelfEmployee ? startMonthSelfEmployee : startMonthContractEmployee
  );

  const jobTitleName = isSelfEmployee
    ? "jobTitleSelfEmployee"
    : "jobTitleContractEmployee";
  const startMonthName = isSelfEmployee
    ? "startMonthSelfEmployee"
    : "startMonthContractEmployee";

  return (
    <div className="w-full">
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-4 w-full"
        value={jobTitle}
        error={jobTitle?.length < 3 && jobTitle.length !== 0}
        helperText={
          jobTitle?.length !== 0 && jobTitle?.length < 3 && "נא מלא שם תפקיד"
        }
        placeholder="שם תפקיד"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {jobTitle?.length > 2 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : jobTitle?.length === 0 ? (
                ""
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setJobTitle(e.target.value);
          setEmployeeForm({ ...employeeForm, [jobTitleName]: e.target.value });
        }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-4 w-full"
        value={startMonth}
        error={startMonth?.length < 2 && startMonth.length !== 0}
        helperText={
          startMonth?.length !== 0 &&
          startMonth?.length < 2 &&
          "חודש תחילת עבודה"
        }
        placeholder="חודש תחילת עבודה"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {startMonth?.length > 1 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : startMonth?.length === 0 ? (
                ""
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setStartMonth(e.target.value);
          setEmployeeForm({
            ...employeeForm,
            [startMonthName]: e.target.value,
          });
        }}
      />
    </div>
  );
}
