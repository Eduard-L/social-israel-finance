import { IdStep } from "../Step1/IdStep";
import { DataContext } from "../../context/DataContext";
import { useContext, useState } from "react";
import { VerifyCode } from "../Step2/VerifyCode";
import { api } from "../../api/Api";
import { EmployeeType } from "../Step3/EmployeeType";
import { Success } from "../Step7/Success";
import { AdditionalInfo } from "../Step6/AdditionalInfo";
import { TypeForm } from "../Step4/TypeForm";
import { FileUploader } from "../Step5/FileUploader";

export function Main({}) {
  const { data, setData, setStep, step, setIsLoading, handleOpenMessage } =
    useContext(DataContext);
  const { userId } = data;
  const [id, setId] = useState(userId ?? "");
  const [method, setMethod] = useState("WhatsApp");

  const handleSendSmsBtnClick = async (toSentAgain) => {
    if (id.length !== 9) {
      handleOpenMessage("id in not valid", "error");
      return;
    }
    setIsLoading(true);

    try {
      const userData = await api.handleVerifyId(id, method);

      if (userData) {
        setData({
          ...data,
          userId: id,
          userName: userData.userName,
          method: method,
          hiddenPhone: userData.hiddenPhone,
        });

        if (!toSentAgain) {
          setStep(step + 1);
        }
      } else {
        handleOpenMessage(
          "something went wrong, please check your id or connection",
          "error"
        );
      }
    } catch (e) {
      console.log(e);
      handleOpenMessage(
        "something went wrong, please check your id or connection",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySmsCode = async (code) => {
    setIsLoading(true);
    try {
      const employeeFormDetails = await api.handleVerifyCode(userId, code);

      if (employeeFormDetails) {
        setData({ ...data, employeeInfo: employeeFormDetails });
        setStep(step + 1);
      } else {
        handleOpenMessage("something went wrong , try again", "error");
      }
    } catch (e) {
      console.log(e);
      handleOpenMessage("something went wrong, please check the code", "error");
    } finally {
      setIsLoading(false);
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
