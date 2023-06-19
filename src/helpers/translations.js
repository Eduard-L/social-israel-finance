export const translationsObj = {
    en: {
        hello: "Hello",
        pageOneTitle: "For entering the monthly report form with a personal verification code via SMS, please enter your ID number.",
        validationIdError: "please enter a valid id",
        getPersonalVerCode: "get verification code",
        idCheckError: "something went wrong, please check your id or connection",
        tryAgain: "something went wrong, please check the code",
        enterToForm: "To the form",
        sendAgain: "didn't get,please send it again.",
        personalNum: "Personal verification code",
        sentTo: "The credit provider sent you an SMS message to number: ",
        EnterVerificationCode: "Please enter the verification code.",
        EmployeeTypeTextOne: `The monthly report form provides information to the credit provider regarding financial repayment as part of the "name of the program".`,
        EmployeeTypeTextTwo: "Please fill out the form regarding your employment situation.",
        SelfEmployee: "Self-employed",
        HiredEmployee: "Hired-Employed",
        SelfPlusHired: "Hired+Self employed",
        Unemployed: "Unemployed",
        Continue: "Continue",
        fillJobTitle: "please fill job title, min 3 chars",
        jobTitle: "job title",
        startDateWork: "Date of starting work",
        salaryLastMonth: "gross salary of the last month",
        pleaseFillGrossSalaryLastMonth: "please fill last gross salary, min 3 chars",
        companyName: "company name",
        fillCoName: "please fill company name, min 3 chars",
        jobPercentage: "Job percentage",
        numbersOnly: "please fill numbers only",
        grossSalary: "gross salary",
        pleaseFillGrossSalary: "please fill gross salary, min 3 chars",
        percentError: "fill value between 0 and 100",
        uploadPayCheckOne: "Please upload monthly paychecks",
        uploadPayCheckTwo: "Please upload monthly paychecks for months",
        uploadFilesValidation: "you cant upload more than 6 MB",
        helpUploading: "For help uploading files",
        Notes: "Notes:",
        SubmitReport: "Submit the report",
        sentSuccesfully: "The report was sent successfully.",
        ifChangedStatus: "Please let us know as soon as possible if there are any changes to your employment situation.",
        QandA: "Q&A"

    },
    he: {
        hello: "שלום",
        pageOneTitle: "לקבל קוד אימות אישי לצורך כניסה לטופס הדיווח החודשי, יש להכניס מספר תעודת זהות ולבחור באפשרות השליחה הרצויה:",
        validationIdError: "נא מלא תעודת זהות תקינה",
        getPersonalVerCode: "קבלת קוד אימות אישי",
        idCheckError: "משהו השתבש , הנה בדוק את תעודת הזהות או את החיבור",
        tryAgain: "משהו השתבש, הנה נסה שנית או בדוק חיבור",
        enterToForm: "כניסה לטופס",
        sendAgain: "לא קיבלתי שלחו שוב",
        personalNum: "מס אישי",
        sentTo: ":הודעת טקסט נשלחה אלייך למס",
        EnterVerificationCode: "יש להכניס את מס' האימות האישי שקיבלת.",
        EmployeeTypeTextOne: `לפניך מערכת לעדכון המצב התעסוקתי שלך במסגרת התוכנית הזנק הגליל.`,
        EmployeeTypeTextTwo: "האם את/ה ?",
        EmployeeTypeTextThree: "הפרטים ישמשו את קרנות קורת לניהול החזר הלוואה.",
        SelfEmployee: "עצמאי/ת",
        HiredEmployee: "שכיר/ה",
        SelfPlusHired: "שכיר/ה+עצמאי/ית",
        Unemployed: "לא עובד/ת",
        Continue: "אפשר להמשיך",
        fillJobTitle: "נא למלא שם תפקיד , מינימום 3 תווים",
        jobTitle: "עיסוק",
        selfEmployeeJobTitle: ' הכנסות ברוטו  מהחודש האחרון - ללא מע"מ',
        startDateWork: "תאריך תחילת עבודה",
        salaryLastMonth: "הכנסות עבודה מחודש קודם",
        pleaseFillGrossSalaryLastMonth: "נא מלא הכנסות מחדוש קודם, מינימום 3 תווים",
        companyName: "שם חברה",
        fillCoName: "הנה הזן שם חברה,3 תווים לפחות",
        jobPercentage: "אחוז משרה",
        numbersOnly: "נא הזן ספרות בלבד",
        grossSalary: "שכר ברוטו",
        pleaseFillGrossSalary: "הזן שכר ברוטות, לפחות 3 תווים",
        percentError: "הזן ערך בין 0 ל 100",
        uploadPayCheckOne: " יש לעלות אישור על מעמד לא עובד מביטוח לאומי עבור חודשים הבאים:",
        uploadPayCheckTwo: " שכיר יקר יש לעלות תלושי שכר עבור חודשים",
        uploadFilesValidation: "לא ניתן לעלות קבצים הגדולים מ 6 מגה-בייט",
        helpUploading: "לעזרה בהעלאת קבצים",
        Notes: "הערות נוספות",
        SubmitReport: "שליחת דיווח",
        sentSuccesfully: "הדיווח נשלח בהצלחה",
        ifChangedStatus: " במידה ויש שינויים במצבך התעסוקתי, יש לעדכן אותנו בהקדם",
        QandA: "שאלות ותשובות"

    }
}

export const QANDA_EN = [
    {
        question: 'כל כמה זמן אני צריך לעדכן את הפרטים שלי?',
        answer: 'כל שלושה חודשים, תשלח אליך הודעת ואטסאפ עם קישור לשאלון דיווח.'
    },
    {
        question: 'אם אני עצמאי ואין לי תלושי שכר, איזה קבצים להעלות?',
        answer: 'יש להעלות את כל חשבוניות שקיבלת בחודשים הרלוונטיים, ובסוף שנה לצרף דוח אישור מרואה חשבון על הכנסות.'
    },
    {
        question: 'אם לא קיבלתי תלוש שכר לחודש הנוכחי האם אפשר לא לעלות קובץ?',
        answer: 'אין אפשרות לא להעלות קבצים, יש להעלות את תלוש השכר האחרון שנמצא ברשותך.'
    },
    {
        question: 'אני לא מועסק. איך אני מוריד את הקובץ מביטוח לאומי?',
        answer: `הטופס נקרא 'אישור על מעמד לא עובד' והוא נמצא באתר ביטוח לאומי > טפסים ואישורים > אישורים > דמי ביטוח. אפשר גם למצוא דרך חיפוש בגוגל. באתר ישנה אפשרות לשלוח למייל את הטופס`
    },
    {
        question: 'למה אני צריך להעלות את הטפסים האישיים שלי?',
        answer: 'המחוייבות שלך במסגרת התוכנית היא לעדכן אותנו במצב התעסוקתי שלך ולהחזיר חזרה לפרויקט אם אתה מרוויח מעל רף השכר שסיכמנו'
    },
    {
        question: 'מה הוא המספר האישי שקיבלתי מגוף האשראי?',
        answer: 'קיבלת את המספר האישי בתחילת ההכשרה מגוף האשראי, מומלץ לשמור אותו במקום נגיש. אם שכחת את המספר, אפשר אלינו למייל'
    },
    {
        question: 'איך אני צריך לדווח את הדיווח השנתי?',
        answer: 'שכיר נדרש לאישור תקופת ביטוח מעסיקים. עצמאי שומה של השנה הקודמת או דוח רווח והפסד'
    },
    {
        question: 'לשאלות ניתן לפנות במייל ל- gabriela@kiedf.org',
        answer: ''
    }
]

export const QANDA_HE = [
    {
        question: 'כל כמה זמן אני צריך לעדכן את הפרטים שלי?',
        answer: 'כל שלושה חודשים, תשלח אליך הודעת ואטסאפ עם קישור לשאלון דיווח.'
    },
    {
        question: 'אם אני עצמאי ואין לי תלושי שכר, איזה קבצים להעלות?',
        answer: 'יש להעלות את כל חשבוניות שקיבלת בחודשים הרלוונטיים, ובסוף שנה לצרף דוח אישור מרואה חשבון על הכנסות.'
    },
    {
        question: 'אם לא קיבלתי תלוש שכר לחודש הנוכחי האם אפשר לא לעלות קובץ?',
        answer: 'אין אפשרות לא להעלות קבצים, יש להעלות את תלוש השכר האחרון שנמצא ברשותך.'
    },
    {
        question: 'אני לא מועסק. איך אני מוריד את הקובץ מביטוח לאומי?',
        answer: `הטופס נקרא 'אישור על מעמד לא עובד' והוא נמצא באתר ביטוח לאומי > טפסים ואישורים > אישורים > דמי ביטוח. אפשר גם למצוא דרך חיפוש בגוגל. באתר ישנה אפשרות לשלוח למייל את הטופס`
    },
    {
        question: 'למה אני צריך להעלות את הטפסים האישיים שלי?',
        answer: 'המחוייבות שלך במסגרת התוכנית היא לעדכן אותנו במצב התעסוקתי שלך ולהחזיר חזרה לפרויקט אם אתה מרוויח מעל רף השכר שסיכמנו'
    },
    {
        question: 'מה הוא המספר האישי שקיבלתי מגוף האשראי?',
        answer: 'קיבלת את המספר האישי בתחילת ההכשרה מגוף האשראי, מומלץ לשמור אותו במקום נגיש. אם שכחת את המספר, אפשר אלינו למייל'
    },
    {
        question: 'איך אני צריך לדווח את הדיווח השנתי?',
        answer: 'שכיר נדרש לאישור תקופת ביטוח מעסיקים. עצמאי שומה של השנה הקודמת או דוח רווח והפסד'
    },
    {
        question: 'לשאלות ניתן לפנות במייל ל- gabriela@kiedf.org',
        answer: ''
    }
]