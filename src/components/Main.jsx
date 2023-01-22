import { IdStep } from "./IdStep";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { VerifyCode } from "./VerifyCode";

export function Main({}) {
  const { data, setData, setStep, step } = useContext(DataContext);
  const { userId } = data;
  const [id, setId] = useState(userId ?? "");

  console.log(data);

  const handleSendSmsBtnClick = () => {
    if (id.length !== 9) {
      alert("id in not valid");
    }
    // send request
    // if response is ok and sms was sented
    // save the id in global state
    // redirect user to next page
    // else handleError

    alert("sms was sent succefully and the id was saved for next page");
    setData({
      ...data,
      userId: id,
      userName: "ישראל ישראלי",
      vCode: "123456789",
    });
    setStep(step + 1);
    setId("");
  };

  return (
    <>
      {step === 0 ? (
        <IdStep onBtnClick={handleSendSmsBtnClick} id={id} setId={setId} />
      ) : (
        ""
      )}
      {step === 1 ? <VerifyCode /> : " "}
    </>
  );
}
