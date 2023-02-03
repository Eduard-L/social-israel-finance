import { Typography, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { ContractEmployee } from "./ContractEmployee";
import { SelfEmployee } from "./SelfEmployee";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
export function TypeForm({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, hiddenPhone, employeeType } = data;
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isFinishedFisrtForm, setIsFinishedFirstForm] = useState(false);
  const emptyInfo = {
    jobTitleSelfEmployee: "",
    jobTitleContractEmployee: "",
    startMonthSelfEmployee: "",
    startMonthContractEmployee: "",
    monthSalary: "",
    companyName: "",
    brutoSalary: "",
    jobPercentage: "",
  };
  const [employeeForm, setEmployeeForm] = useState(
    data.employeeForm ?? emptyInfo
  );

  const handleNextStep = () => {
    setData({ ...data, employeeForm });
    if (isFinishedFisrtForm) {
      setStep(step + 1);
      return;
    }
    if (employeeType === 1 || employeeType === 0) {
      setStep(step + 1);
    } else {
      setIsFinishedFirstForm(true);
    }
  };

  useEffect(() => {
    if (employeeType === 3) {
      setStep(step - 1);
    }
  }, []);

  const type =
    employeeType === 1
      ? "שכיר"
      : employeeType === 0
      ? "עצמאי/ת"
      : employeeType === 2
      ? "שכיר/ה + עצמאי/ת"
      : " לא מועסק";
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div>
        <div
          className="flex flex-row"
          style={{ fontWeight: "bold", direction: direction }}
        >
          <Typography
            className="text-start ml-1"
            style={{ fontWeight: "bold", direction: direction }}
          >
            {userName} |
          </Typography>
          <Typography
            className="text-start"
            style={{
              fontWeight: "bold",
              direction: direction,
              color: "#4091df",
            }}
          >
            {type}
          </Typography>
        </div>

        {employeeType === 0 ? (
          <SelfEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeType === 1 ? (
          <ContractEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeType === 2 && !isFinishedFisrtForm ? (
          <ContractEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeType === 2 && isFinishedFisrtForm ? (
          <SelfEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
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
    </div>
  );
}
