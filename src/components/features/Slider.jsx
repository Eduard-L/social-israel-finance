import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export function Steper({ onNextStep, onPreStep, step }) {
  const theme = useTheme();
  const maxSteps = 7;

  return (
    <MobileStepper
      steps={maxSteps}
      sx={{ width: 320, justifyContent: "center" }}
      position="static"
      activeStep={step}
      nextButton={
        <Button
          size="small"
          onClick={onNextStep}
          disabled={step === maxSteps - 1}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={onPreStep} disabled={step === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
