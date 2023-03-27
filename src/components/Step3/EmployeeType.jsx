import { Typography, Button } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { useState } from "react";
import { EMPLOYMENT_STATUS } from "../../Interface/EmploymentStatus";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export function EmployeeType({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userName, userId, direction, employeeInfo, translation, isEnglish } =
    data;

  const [type, setType] = useState(employeeInfo?.employmentStatus ?? "שכיר");
  const [lastUpdatedSalaryDate, setLastUpdatedSalaryDate] = useState(
    employeeInfo?.lastTimeUpdatedSalary || null
  );

  const handleNextStep = () => {
    setData({
      ...data,
      employeeInfo: {
        ...employeeInfo,
        employmentStatus: type,
        lastTimeUpdatedSalary: lastUpdatedSalaryDate,
      },
    });
    if (type === EMPLOYMENT_STATUS.Not_Employed) {
      setStep(step + 2);
    } else {
      setStep(step + 1);
    }
  };

  const handleChangeType = (t) => {
    if (type === t) return;

    setType(t);
    setData({
      ...data,
      files: [],
      employeeInfo: {
        employmentStatus: t,
        lastTimeUpdatedSalary: lastUpdatedSalaryDate,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography className="text-center " style={{ fontWeight: "bold" }}>
          ,{translation.hello} {userName}
        </Typography>
        <Typography className="text-center" style={{ direction: direction }}>
          {translation.EmployeeTypeTextOne}
        </Typography>
        <Typography className="text-center mt-4">
          {translation.EmployeeTypeTextTwo}
        </Typography>
        <div className="flex flex-row flex-wrap gap-2 items-center justify-center mt-4">
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700  "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor:
                type === EMPLOYMENT_STATUS.Independent ? "lightgrey" : "white",
              color:
                type === EMPLOYMENT_STATUS.Independent ? "grey" : "#4091df",
              border:
                !(type === EMPLOYMENT_STATUS.Independent) &&
                "2px solid #4091df",
            }}
            onClick={() => handleChangeType(EMPLOYMENT_STATUS.Independent)}
          >
            {translation.SelfEmployee}
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              fontSize: isEnglish ? "12px" : "",
              height: isEnglish && "40px",
              backgroundColor:
                type === EMPLOYMENT_STATUS.Employee ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Employee ? "grey" : "#4091df",
              border:
                !(type === EMPLOYMENT_STATUS.Employee) && "2px solid #4091df",
            }}
            onClick={() => handleChangeType(EMPLOYMENT_STATUS.Employee)}
          >
            {translation.HiredEmployee}
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-500   "
            variant="contained"
            style={{
              direction: direction,
              fontSize: isEnglish ? "12px" : "",
              height: isEnglish && "40px",
              width: 155,
              backgroundColor:
                type === EMPLOYMENT_STATUS.Combined ? "lightgrey" : "white",
              color: type === EMPLOYMENT_STATUS.Combined ? "grey" : "#4091df",
              border:
                !(type === EMPLOYMENT_STATUS.Combined) && "2px solid #4091df",
            }}
            onClick={() => handleChangeType(EMPLOYMENT_STATUS.Combined)}
          >
            {translation.SelfPlusHired}
          </Button>
          <Button
            className=" rounded-full flex flex-row self-start bg-blue-700 w-2/5 "
            variant="contained"
            style={{
              direction: direction,
              width: 155,
              backgroundColor:
                type === EMPLOYMENT_STATUS.Not_Employed ? "lightgrey" : "white",
              color:
                type === EMPLOYMENT_STATUS.Not_Employed ? "grey" : "#4091df",
              border:
                !(type === EMPLOYMENT_STATUS.Not_Employed) &&
                "2px solid #4091df",
            }}
            onClick={() => {
              handleChangeType(EMPLOYMENT_STATUS.Not_Employed);
              setData({ ...data, employeeForm: null });
            }}
          >
            {translation.Unemployed}
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          style={{ direction: "rtl" }}
          onClick={() => handleNextStep()}
        >
          {translation.Continue}
          <KeyboardBackspaceIcon />
        </Button>
        {/* <Button
          className=" rounded-full flex flex-row self-start bg-blue-500  "
          variant="contained"
          style={{
            direction: direction,
            transform: `rotate(180deg)`,
          }}
          onClick={() => setStep(step - 1)}
        >
          <KeyboardBackspaceIcon />
        </Button> */}
      </div>
    </>
  );
}
