import { useContext } from "react";
import { DataContext } from "../context/DataContext";
export function FileUploader({}) {
  const { data, setStep, step } = useContext(DataContext);
  console.log(data);
  return <div>uploadrer</div>;
}
