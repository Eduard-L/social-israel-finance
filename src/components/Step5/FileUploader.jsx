import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, Typography } from "@mui/material";
import { File } from "./File";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  EMPLOYMENT_STATUS,
  EMPLOYMENT_STATUS_OP_HE,
  EMPLOYMENT_STATUS_OP_EN,
} from "../../Interface/EmploymentStatus";
import {
  getPreviousMonthsString,
  handleTitleForUploader,
  handleUserDocsCounterValidation,
} from "../../helpers/handlers";
import { v4 as uuidv4 } from "uuid";

import { TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function FileUploader({}) {
  const { data, setStep, step, setData, handleOpenMessage } =
    useContext(DataContext);
  const { direction, employeeInfo, translation, userName, isEnglish } = data;
  const [passwordDoc, setPasswordDoc] = useState("");
  const [isUploadBlockVisible, setIsUploadBlockVisible] = useState(false);

  const [files, setFiles] = useState(data?.files ?? []);
  const isBtnDisabled = handleUserDocsCounterValidation(
    files.length,
    employeeInfo?.employmentStatus,
    handleOpenMessage,
    true
  );

  const currentMonth = getPreviousMonthsString();

  const status = isEnglish ? EMPLOYMENT_STATUS_OP_EN : EMPLOYMENT_STATUS_OP_HE;

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = instructionsFile;
    link.download = "Instructions-Bituah-leumi.pdf";
    link.click();
  };

  const handleNextStep = () => {
    const validation = handleUserDocsCounterValidation(
      files.length,
      employeeInfo?.employmentStatus,
      handleOpenMessage
    );
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
      <div
        className="flex flex-col items-center w-full"
        style={{ maxHeight: "85%", overflowY: "auto" }}
      >
        <div
          className="flex flex-row w-full"
          style={{ fontWeight: "bold", direction: direction }}
        >
          <Typography
            className="text-start ml-1 "
            style={{ fontWeight: "bold", direction: direction }}
          >
            {userName} |
          </Typography>
          <Typography
            className="text-start"
            style={{
              fontWeight: "bold",
              direction: direction,
              color: "#4091df",
            }}
          >
            {status[`${employeeInfo?.employmentStatus}`]}
          </Typography>
        </div>

        <Typography
          className="text-start w-full  "
          style={{ direction: direction, fontSize: "16px" }}
        >
          {handleTitleForUploader(employeeInfo?.employmentStatus, translation)}
        </Typography>

        {employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Combined ||
        employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Independent ? (
          <div className="">
            <Typography
              className=" mt-4"
              style={{ direction: direction, fontSize: "16px" }}
            >
              עצמאי/ת נא לעלות את <b>אחד</b> מהמסמכים הבאים עבור חודשים-
              {currentMonth}
            </Typography>
            <div className=" mt-2">
              <Typography
                className="text-start w-full "
                style={{ direction: direction, fontSize: "14px" }}
              >
                1.אישור חתום מרואה חשבון על הכנסות ברבעון האחרון
              </Typography>

              <Typography
                className="text-start w-full"
                style={{ direction: direction, fontSize: "14px" }}
              >
                2.דוח הכנסות של הרבעון האחרון ממערכת חשבונית ירוקה
              </Typography>
              <Typography
                className="text-start w-full"
                style={{ direction: direction, fontSize: "14px" }}
              >
                3. דו"ח סיכום חודש ממערכת חשבונית ירוקה.
              </Typography>
            </div>
          </div>
        ) : (
          ""
        )}

        {employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Not_Employed ? (
          <span
            className="text-center underline font-bold text-sm mt-4"
            style={{
              direction: direction,
              cursor: "pointer",
            }}
            onClick={() => {
              handleDownloadFile();
            }}
          >
            מדריך להורדת אישור מביטוח לאומי
          </span>
        ) : (
          ""
        )}

        <div className="mt-6 mb-6 w-full">
          {files.map((f) => (
            <File
              key={uuidv4()}
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
            variant="outlined"
            type="number"
            style={{ direction: direction }}
            required
            className="w-full input_type_password"
            inputProps={{ minLength: 1 }}
            InputProps={{
              inputProps: {
                style: { padding: "10px", fontSize: "15px" }, // Adjust the padding value according to your needs
                className: "input_type_password",
              },
            }}
            value={passwordDoc}
            error=""
            helperText=""
            placeholder="נא להזין סיסמא לתלוש. אם אין להזין 0"
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
          disabled={isBtnDisabled}
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
