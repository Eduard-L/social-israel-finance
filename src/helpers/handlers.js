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

export function getPreviousMonthsString() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Adding 1 because month index starts from 0
    const currentYear = currentDate.getFullYear().toString().slice(-2); // Extracting last two digits of the year

    let previousMonth1 = currentMonth - 1;
    let previousMonth2 = currentMonth - 2;

    // Handling cases where the current month is January or February
    if (previousMonth1 === 0) {
        previousMonth1 = 12;
    } else if (previousMonth1 === -1) {
        previousMonth1 = 11;
    }

    if (previousMonth2 === 0) {
        previousMonth2 = 12;
    } else if (previousMonth2 === -1) {
        previousMonth2 = 11;
    } else if (previousMonth2 === -2) {
        previousMonth2 = 10;
    }

    // Padding single-digit months with leading zeros
    previousMonth1 = String(previousMonth1).padStart(2, '0');
    previousMonth2 = String(previousMonth2).padStart(2, '0');

    var currentMonthDate = currentMonth.toString().padStart(2, '0') + '/' + currentYear;
    var previousMonth1Date = previousMonth1 + '/' + currentYear;
    var previousMonth2Date = previousMonth2 + '/' + currentYear;

    return `${currentMonthDate} , ${previousMonth1Date} , ${previousMonth2Date}`;
}


export const handleTitleForUploader = (employeeStatus, translation) => {
    switch (employeeStatus) {
        case EMPLOYMENT_STATUS.Not_Employed:
            return `${translation.uploadPayCheckOne}  - ${getPreviousMonthsString()}`;
            break;
        case EMPLOYMENT_STATUS.Employee:
            return ` ${translation.uploadPayCheckTwo} - ${getPreviousMonthsString()}`;
            break;
        case EMPLOYMENT_STATUS.Independent:
            break;
        case EMPLOYMENT_STATUS.Combined:
            return ` ${translation.uploadPayCheckTwo} - ${getPreviousMonthsString()}`;
            break;
    }
};

export const handleUserDocsCounterValidation = (filesCounter, employmentStatus, handleOpenMessage, isForDisable) => {

    switch (employmentStatus) {
        case EMPLOYMENT_STATUS.Not_Employed:
            if (filesCounter < 1 && !isForDisable) {
                handleOpenMessage(" יש לעלות מסמך אחד לפחות", "error");
                return false;
            } else if (filesCounter < 1) {
                return true
            }
            break;
        case EMPLOYMENT_STATUS.Employee:
            if (filesCounter < 3 && !isForDisable) {
                handleOpenMessage("יש לעלות את כל תלושי השכר הרשומים למעלה", "error");
                return false;
            } else if (filesCounter < 3) {
                return true
            }
            break;
        case EMPLOYMENT_STATUS.Independent:
            if (filesCounter < 1 && !isForDisable) {
                handleOpenMessage("יש לעלות מסמך אחד לפחות", "error");
                return false;
            } else if (filesCounter < 1) {
                return true
            }
            break;
        case EMPLOYMENT_STATUS.Combined:
            if (filesCounter < 4 && !isForDisable) {
                handleOpenMessage("יש לעלות את כל המסמכים הרשומים למעלה", "error");
                return false;
            } else if (filesCounter < 4) {
                return true
            }
            break;
    }

    if (isForDisable) {
        return false
    } else {
        return true;
    }

};