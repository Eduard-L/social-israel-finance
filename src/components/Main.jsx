import { IdStep } from "./IdStep";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { VerifyCode } from "./VerifyCode";
import { api } from "../api/Api";
import { EmployeeType } from "./EmployeeType";
import { Success } from "./Success";
import { AdditionalInfo } from "./AdditionalInfo";
import { TypeForm } from "./TypeForm";
import { FileUploader } from "./FileUploader";

export function Main({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userId } = data;
  const [id, setId] = useState(userId ?? "");
  const [method, setMethod] = useState("WhatsApp");
  console.log(method);

  const handleSendSmsBtnClick = async () => {
    if (id.length !== 9) {
      alert("id in not valid");
      return;
    }

    try {
      const data = await api.handleVerifyId(id, method);

      if (data) {
        setData({
          ...data,
          userId: id,
          userName: data.userName,
          method: method,
          hiddenPhone: data.hiddenPhone,
        });
        alert("sms was sent succefully and the id was saved for next page"); // success response
        setStep(step + 1);
      } else {
        alert("something went wrong, check your id or connection");
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong, check your id or connection");
    }
  };

  const handleVerifySmsCode = async (code) => {
    try {
      const employeeFormDetails = await api.handleVerifyCode(userId, code);

      if (employeeFormDetails) {
        setData({ ...data, employeeInfo: employeeFormDetails });
        alert("code was veryfied");
        setStep(step + 1);
      } else {
        alert("something went wrong , try again");
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-2/3"
      style={{ width: 320 }}
    >
      {step === 0 ? (
        <IdStep
          onBtnClick={handleSendSmsBtnClick}
          id={id}
          setId={setId}
          method={method}
          setMethod={setMethod}
        />
      ) : (
        ""
      )}
      {step === 1 ? (
        <VerifyCode
          onSendCode={handleVerifySmsCode}
          onSmsSend={handleSendSmsBtnClick}
        />
      ) : (
        " "
      )}
      {step === 2 ? (
        <EmployeeType
          onSendCode={handleVerifySmsCode}
          onSmsSend={handleSendSmsBtnClick}
        />
      ) : (
        " "
      )}
      {step === 3 ? <TypeForm /> : " "}
      {step === 4 ? <FileUploader /> : " "}
      {step === 5 ? <AdditionalInfo /> : " "}
      {step === 6 ? <Success /> : " "}
    </div>
  );
}
