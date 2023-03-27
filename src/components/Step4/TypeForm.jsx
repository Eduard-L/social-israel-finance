import { Typography, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { ContractEmployee } from "./ContractEmployee";
import { SelfEmployee } from "./SelfEmployee";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRef } from "react";
import {
  EMPLOYMENT_STATUS,
  EMPLOYMENT_STATUS_OP_HE,
  EMPLOYMENT_STATUS_OP_EN,
} from "../../Interface/EmploymentStatus";
import { handleCheckValidation } from "../../helpers/handlers";

export function TypeForm({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const {
    userName,
    userId,
    direction,
    hiddenPhone,
    employeeInfo,
    isEnglish,
    translation,
  } = data;
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isFinishedFisrtForm, setIsFinishedFirstForm] = useState(false);

  const [employeeForm, setEmployeeForm] = useState(employeeInfo || {});

  useEffect(() => {
    setData({ ...data, employeeInfo: employeeForm });
  }, [employeeForm]);

  const handleNextStep = () => {
    setData({ ...data, employeeInfo: employeeForm });
    if (isFinishedFisrtForm) {
      setStep(step + 1);
      return;
    }
    if (
      employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Employee ||
      employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Independent
    ) {
      setStep(step + 1);
    } else {
      setIsFinishedFirstForm(true);
    }
  };

  useEffect(() => {
    if (employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Not_Employed) {
      setStep(step - 1);
    }
  }, []);

  const form = useRef();

  const handleCheckFormValidity = () => {
    if (form.current.checkValidity()) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  useEffect(() => {
    // if (!form.current) return;
    handleCheckFormValidity();
    setIsBtnDisabled(() =>
      handleCheckValidation(
        employeeForm,
        employeeInfo.employmentStatus,
        isFinishedFisrtForm,
        isEnglish
      )
    );
  }, [employeeForm, step, isFinishedFisrtForm, form]);

  const status = isEnglish ? EMPLOYMENT_STATUS_OP_EN : EMPLOYMENT_STATUS_OP_HE;

  return (
    <form ref={form} className="flex flex-col justify-between w-full h-full">
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
            {status[`${employeeInfo?.employmentStatus}`]}
          </Typography>
        </div>

        {employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Independent ? (
          <SelfEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Employee ? (
          <ContractEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Combined &&
        !isFinishedFisrtForm ? (
          <ContractEmployee
            employeeForm={employeeForm}
            setEmployeeForm={setEmployeeForm}
          />
        ) : (
          ""
        )}
        {employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Combined &&
        isFinishedFisrtForm ? (
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
          style={{ direction: "rtl" }}
          onClick={() => handleNextStep()}
          disabled={isBtnDisabled}
        >
          {translation.Continue}
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
    </form>
  );
}
