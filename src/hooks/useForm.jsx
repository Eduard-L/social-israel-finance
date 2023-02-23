import { useEffect, useState } from "react";

export function useForm(employeeInfo) {
  const [values, setValues] = useState({
    jobTitleSelfEmployee: employeeInfo?.jobTitleSelfEmployee,
    jobTitleContractEmployee: employeeInfo?.jobTitleContractEmployee,
    startMonthSelfEmployee: employeeInfo?.startMonthSelfEmployee,
    startMonthContractEmployee: employeeInfo?.startMonthContractEmployee,
    monthSalary: employeeInfo?.monthSalary,
    companyName: employeeInfo?.companyName,
    jobPercentage: employeeInfo?.jobPercentage,
    brutoSalary: employeeInfo?.brutoSalary,
  });

  const [errors, setErrors] = useState();

  const [isValid, setIsValid] = useState(false);

  console.log(isValid);

  const validateForm = () => {
    const form = document.querySelector("form");
    const allInputs = document.querySelectorAll("form input");

    let isValidForm = true;
    let newErrors = {};

    allInputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValidForm = false;
        newErrors[input.name] = input.validationMessage;
      }
    });

    setErrors(newErrors);
    setIsValid(isValidForm);
  };

  useEffect(() => {
    const allInputs = document.querySelectorAll("form input");
    debugger;
    allInputs.forEach((input) => {
      handleChange({ target: input });
    });
  }, []);

  // useEffect(() => {
  //   validateForm();
  // }, [values]);

  const handleChange = (e) => {
    const { name } = e.target;

    setValues({
      ...values,
      [name]: e.target.value,
    });

    const form = e.target.closest("form");

    if (form.checkValidity()) {
      setErrors({});
      setIsValid(true);
    } else {
      setIsValid(false);
      setErrors({
        ...errors,
        [name]: e.target.validationMessage,
      });
    }
  };

  const resetForm = () => {
    setValues({});
    setErrors({});
    setIsValid(false);
  };

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  };
}
