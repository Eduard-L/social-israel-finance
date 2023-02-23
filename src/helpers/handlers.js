import { EMPLOYMENT_STATUS } from "../Interface/EmploymentStatus";

export function handleCheckValidation(data, type, isFinishedFirst) {
    const {
        monthSalary,
        jobTitleSelfEmployee,
        jobTitleContractEmployee,
        startMonthSelfEmployee,
        startMonthContractEmployee,
        companyName,
        jobPercentage,
        brutoSalary
    } = data
    let isValid = true;

    function handleCheckSelfEmployeeForm() {
        return Boolean(Boolean(jobTitleSelfEmployee) && jobTitleSelfEmployee.length > 2 && Boolean(startMonthSelfEmployee) && Boolean(monthSalary) && monthSalary.length > 2)
    }

    function handleCheckContractEmployee() {
        return Boolean(Boolean(companyName) && companyName.length > 2 && Boolean(jobTitleContractEmployee) && jobTitleContractEmployee.length > 2 && Boolean(startMonthContractEmployee) && Boolean(jobPercentage) && Boolean(brutoSalary) && brutoSalary.length > 2)
    }


    if (type === EMPLOYMENT_STATUS.Independent || (type === EMPLOYMENT_STATUS.Combined && isFinishedFirst)) {

        isValid = handleCheckSelfEmployeeForm()

    }
    else if (type === EMPLOYMENT_STATUS.Employee || (type === EMPLOYMENT_STATUS.Combined && !isFinishedFirst)) {

        isValid = handleCheckContractEmployee();

    }

    return !isValid

}

