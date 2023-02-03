import { Typography, Button, TextField } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ErrorIcon from "@mui/icons-material/Error";
import { SharedFields } from "./SharedFields";

export function ContractEmployee({ employeeForm, setEmployeeForm }) {
  const { data, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone, employeeType } = data;
  const { companyName, jobPercentage, brutoSalary } = employeeForm;

  return (
    <div
      className="flex flex-col w-full"
      style={{ direction: direction, height: "60%" }}
    >
      <TextField
        id="standard-basic"
        variant="standard"
        required
        type="text"
        className="mt-4"
        value={companyName}
        error={companyName?.length < 3 && companyName.length !== 0}
        helperText={
          companyName?.length !== 0 &&
          companyName?.length < 3 &&
          "הנה הזן שם חברה"
        }
        placeholder="שם חברה"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {companyName?.length > 2 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : companyName?.length === 0 ? (
                " "
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setEmployeeForm({ ...employeeForm, companyName: e.target.value });
        }}
      />
      <SharedFields
        employeeForm={employeeForm}
        setEmployeeForm={setEmployeeForm}
      />

      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-4"
        value={jobPercentage}
        placeholder="אחוז משרה"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {jobPercentage?.length > 0 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          if (
            !isNaN(e.target.value) &&
            e.target.value >= 0 &&
            e.target.value <= 100
          ) {
            setEmployeeForm({ ...employeeForm, jobPercentage: e.target.value });
          }
        }}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        className="mt-4"
        value={brutoSalary}
        error={brutoSalary?.length <= 3 && brutoSalary.length > 0}
        helperText={
          brutoSalary?.length !== 0 &&
          brutoSalary?.length <= 3 &&
          "הזן שכר ברוטו"
        }
        placeholder="שכר ברוטו"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {brutoSalary?.length > 3 ? (
                <DoneIcon style={{ color: "green" }} />
              ) : brutoSalary?.length === 0 ? (
                " "
              ) : (
                <ErrorIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            setEmployeeForm({ ...employeeForm, brutoSalary: e.target.value });
          }
        }}
      />
    </div>
  );
}
