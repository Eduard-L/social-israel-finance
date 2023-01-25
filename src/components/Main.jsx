import { IdStep } from "./IdStep";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { VerifyCode } from "./VerifyCode";
import { api } from "../api/Api";

export function Main({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userId } = data;
  const [id, setId] = useState(userId ?? "");

  console.log(id);

  const handleSendSmsBtnClick = async () => {
    if (id.length !== 9) {
      alert("id in not valid");
      return;
    }

    try {
      const data = await api.handleVerifyId(id);

      if (data) {
        // if response is ok and sms was sented
        // save all the data in global state
        // redirect user to next page
      } else {
        // handleError
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }

    alert("sms was sent succefully and the id was saved for next page"); // success response
    setData({
      ...data,
      userId: id,
      userName: data.userName,
    });
    setStep(step + 1);
  };

  const handleVerifySmsCode = async (code) => {
    try {
      const employeeFormDetails = await api.handleVerifyCode(userId, code);

      if (employeeFormDetails) {
        console.log(employeeFormDetails)
        alert(JSON.stringify(employeeFormDetails))
        // if response is ok and sms was sented
        // save all the data in global state
        // redirect user to next page
      } else {
        // handleError
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }
    // send the verify code to the server
    alert("code was veryfied");
    setStep(step + 1);
    // should i save tht user was veryfied in case that he will came back to main page ?
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-2/3"
      style={{ width: 320 }}
    >
      {step === 0 ? (
        <IdStep onBtnClick={handleSendSmsBtnClick} id={id} setId={setId} />
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
    </div>
  );
}
