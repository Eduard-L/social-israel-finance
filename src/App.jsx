import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Steper } from "./components/Slider";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";
import { DataContext } from "./context/DataContext";

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    isEnglish: false,
    direction: "rtl",
    userId: "",
  });

  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const handleStepBack = () => {
    setStep((step) => step - 1);
  };

  return (
    <div className="App w-screen h-screen flex flex-col items-center py-10 justify-between">
      <Logo />
      <DataContext.Provider value={{ data, setData, step, setStep }}>
        <Main step={step} />
        <Steper
          onNextStep={handleNextStep}
          onPreStep={handleStepBack}
          step={step}
        />
      </DataContext.Provider>
    </div>
  );
}

export default App;
