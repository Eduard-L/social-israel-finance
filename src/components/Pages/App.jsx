import { useEffect, useState } from "react";
import "../../styles/App.css";
import { Steper } from "../features/Slider";
import { Logo } from "../features/Logo";
import { Main } from "./Main";
import { DataContext } from "../../context/DataContext";
import { Loader } from "../features/Loader";
import { PopupWithMessage } from "../features/PopupWithMessage";

function App() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    isEnglish: false,
    direction: "rtl",
    userId: "",
  });

  const [popupMessageProps, setPopupMeesageProps] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleClose = () => {
    setPopupMeesageProps({
      isOpen: false,
      message: "",
      type: "warning",
    });
  };

  const handleOpenMessage = (message, type) => {
    setPopupMeesageProps({
      isOpen: true,
      message: message,
      type: type,
    });
  };

  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const handleStepBack = () => {
    setStep((step) => step - 1);
  };

  return (
    <div
      className="App w-screen h-screen flex flex-col items-center justify-between py-10"
      style={{ minHeight: 650 }}
    >
      <div
        className="h-full flex flex-col justify-between items-center relative rounded-xl p-10  main-container"
        style={{ boxShadow: "0px 3px 20px #00000029" }}
      >
        <PopupWithMessage
          popupMessageProps={popupMessageProps}
          handleClose={handleClose}
        />

        <Logo />
        <DataContext.Provider
          value={{
            data,
            setData,
            step,
            setStep,
            setIsLoading,
            isLoading,
            handleOpenMessage,
          }}
        >
          <Main step={step} />
          <Steper
            onNextStep={handleNextStep}
            onPreStep={handleStepBack}
            step={step}
          />
        </DataContext.Provider>
        {isLoading ? <Loader /> : ""}
      </div>
    </div>
  );
}

export default App;
