import { TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

export function SharedFields({
  employeeForm,
  setEmployeeForm,
  isSelfEmployee,
}) {
  const { data } = useContext(DataContext);
  const { translation } = data;
  // const { employeeInfo } = data;
  const {
    jobTitleSelfEmployee,
    jobTitleContractEmployee,
    startMonthSelfEmployee,
    startMonthContractEmployee,
  } = employeeForm;

  const [jobTitle, setJobTitle] = useState(() => {
    if (isSelfEmployee && jobTitleSelfEmployee) {
      return jobTitleSelfEmployee;
    } else if (jobTitleContractEmployee && !isSelfEmployee) {
      return jobTitleContractEmployee;
    } else {
      return "";
    }
  });

  const [startMonth, setStartMonth] = useState(() => {
    if (isSelfEmployee && startMonthSelfEmployee) {
      return startMonthSelfEmployee;
    } else if (startMonthContractEmployee && !isSelfEmployee) {
      return startMonthContractEmployee;
    } else {
      return "";
    }
  });

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
        required
        className="mt-4 w-full"
        inputProps={{ minLength: 3 }}
        value={jobTitle}
        error={jobTitle.length < 3 && jobTitle.length !== 0}
        helperText={
          jobTitle?.length !== 0 &&
          jobTitle?.length < 3 &&
          `${translation.fillJobTitle}`
        }
        placeholder={translation.jobTitle}
        InputProps={{
          minLength: 3,
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
        type="date"
        className="mt-4 w-full"
        value={startMonth}
        required
        error={startMonth?.length < 2 && startMonth.length !== 0}
        label={`* ${translation.startDateWork}`}
        InputLabelProps={{
          shrink: true,
          style: {
            color: startMonth.length !== 0 ? "#4091df" : "red",
            right: -105,
            fontWeight: "bold",
          },
        }}
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
          inputProps: {
            placeholder: "",
          },
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
