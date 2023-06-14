import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, Typography } from "@mui/material";
import { File } from "./File";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EMPLOYMENT_STATUS } from "../../Interface/EmploymentStatus";
import { getPreviousMonthsString } from "../../helpers/handlers";
import { TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function FileUploader({}) {
  const { data, setStep, step, setData, handleOpenMessage } =
    useContext(DataContext);
  const { direction, employeeInfo, translation } = data;
  const [passwordDoc, setPasswordDoc] = useState("");
  const [isUploadBlockVisible, setIsUploadBlockVisible] = useState(false);

  const [files, setFiles] = useState(data?.files ?? []);

  const currentMonth = getPreviousMonthsString();

  const handleTitle = () => {
    switch (employeeInfo?.employmentStatus) {
      case EMPLOYMENT_STATUS.Not_Employed:
        return `${translation.uploadPayCheckOne}`;
        break;
      case EMPLOYMENT_STATUS.Employee:
        return ` ${translation.uploadPayCheckTwo} - ${currentMonth}`;
        break;
      case EMPLOYMENT_STATUS.Independent:
        break;
      case EMPLOYMENT_STATUS.Combined:
        return ` ${translation.uploadPayCheckTwo} - ${currentMonth}`;
        break;
    }
  };

  const handleNextStep = () => {
    const validation = handleUserDocsCounterValidation(files.length);
    if (!validation) return;

    setData({ ...data, files: files });
    setStep(step + 1);
  };

  const handleChange = async (e) => {
    if (!passwordDoc) {
      handleOpenMessage(`נא הזן סיסמא או הזן 0`, "error");
      return;
    }
    if (!e.target.files[0]) return;
    let counter = e.target.files[0].size;
    files.forEach((f) => {
      counter = counter + f.file.size;
    });
    if (counter > 6000000) {
      // prevent upload files higher than 5MB
      handleOpenMessage(`${translation.uploadFilesValidation}`, "warning");
      return;
    }
    const f = {
      file: await convertBase64(e.target.files[0]),
      id: e.target.files[0].name,
      passwordDoc: passwordDoc,
    };
    setFiles([...files, f]);
    setIsUploadBlockVisible(false);
    setPasswordDoc("");
  };

  const handleUserDocsCounterValidation = (filesCounter) => {
    switch (employeeInfo?.employmentStatus) {
      case EMPLOYMENT_STATUS.Not_Employed:
        if (filesCounter < 1) {
          handleOpenMessage(" יש לעלות מסמך אחד לפחות", "error");
          return false;
        }
        break;
      case EMPLOYMENT_STATUS.Employee:
        if (filesCounter < 3) {
          handleOpenMessage("יש לעלות את כל תלושי השכר הרשומים למעלה", "error");
          return false;
        }
        break;
      case EMPLOYMENT_STATUS.Independent:
        if (filesCounter < 1) {
          handleOpenMessage(" יש לעלות מסמך אחד לפחות", "error");
          return false;
        }
        break;
      case EMPLOYMENT_STATUS.Combined:
        if (filesCounter < 4) {
          handleOpenMessage("יש לעלות את כל המסמכים הרשומים למעלה", "error");
          return false;
        }
        break;
    }
    return true;
  };

  const handleDeleteFile = (id) => {
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="flex flex-col items-center w-full">
        <Typography
          className="text-start w-full px-4 "
          style={{ direction: direction, fontSize: "16px" }}
        >
          {handleTitle()}
        </Typography>

        {employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Combined ||
        employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Independent ? (
          <>
            <Typography
              className="text-center mt-4"
              style={{ direction: direction, fontSize: "16px" }}
            >
              לעצמאי יש לעלות את <b>אחד</b> מהמסכים הבאים:
            </Typography>
            <div className="px-5 mt-2">
              <Typography
                className="text-start w-full "
                style={{ direction: direction, fontSize: "14px" }}
              >
                1. אישור מרואה חשבון על ההכנסות בחודש זה
              </Typography>

              <Typography
                className="text-start w-full"
                style={{ direction: direction, fontSize: "14px" }}
              >
                2. כל הקבלות ו/חשבוניות מס/קבלות שהפקת בחודש זה.
              </Typography>
              <Typography
                className="text-start w-full"
                style={{ direction: direction, fontSize: "14px" }}
              >
                3. דו"ח סיכום חודש ממערכת חשבונית ירוקה.
              </Typography>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="mt-6 mb-6 w-full">
          {files.map((f) => (
            <File
              key={f.id}
              fileName={f.id}
              onDelete={handleDeleteFile}
              id={f.id}
            />
          ))}
        </div>

        {isUploadBlockVisible ? (
          ""
        ) : (
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className="rounded-full "
            style={{
              width: 155,
            }}
            onClick={() => setIsUploadBlockVisible(true)}
          >
            <AddCircleOutlineIcon />
          </Button>
        )}

        <div
          className={` flex flex-col justify-center w-full ${
            isUploadBlockVisible ? "" : "hidden"
          }`}
        >
          <TextField
            id="standard-basic"
            variant="standard"
            type="number"
            style={{ direction: direction }}
            required
            className="w-full"
            inputProps={{ minLength: 1 }}
            value={passwordDoc}
            error=""
            helperText=""
            placeholder="נא הזן סיסמא למסמך במידה וקיימת אחרת הזן 0"
            onChange={(e) => setPasswordDoc(e.target.value)}
          />
          <input
            type="file"
            accept="*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={handleChange}
          />
          <label
            htmlFor="contained-button-file"
            className="flex justify-center"
          >
            <Button
              variant="outlined"
              color="primary"
              component="span"
              className="rounded-full mt-4"
              style={{
                width: 155,
              }}
            >
              Upload
              <UploadIcon />
            </Button>
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          style={{ direction: "rtl" }}
          disabled={files.length === 0}
          onClick={() => handleNextStep()}
        >
          {translation.Continue}
          <KeyboardBackspaceIcon />
        </Button>
        <Button
          className=" rounded-full flex flex-row self-start bg-blue-500  "
          variant="contained"
          style={{
            direction: direction,
            transform: `rotate(180deg)`,
          }}
          onClick={() => setStep(step - 1)}
        >
          <KeyboardBackspaceIcon />
        </Button>
      </div>
    </div>
  );
}
