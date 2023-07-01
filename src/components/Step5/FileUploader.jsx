import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useState } from "react";
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
  handleIsOcr,
  handleTitleForUploader,
  handleUserDocsCounterValidation,
} from "../../helpers/handlers";
import { v4 as uuidv4 } from "uuid";

import { UploadBlock } from "../features/UploadBlock";

export function FileUploader({}) {
  const { data, setStep, step, setData, handleOpenMessage } =
    useContext(DataContext);
  const { direction, employeeInfo, translation, userName, isEnglish } = data;
  const [passwordDoc, setPasswordDoc] = useState("");
  const [isUploadBlockVisible, setIsUploadBlockVisible] = useState(false);
  const [isUploadBlock2Visible, setIsUploadBlock2Visible] = useState(false);

  const [files, setFiles] = useState(data?.files ?? []);
  const [filesCombined, setFilesCombined] = useState(data?.filesCombined ?? []);

  const isBtnDisabled = handleUserDocsCounterValidation(
    files.length,
    employeeInfo?.employmentStatus,
    handleOpenMessage,
    true,
    filesCombined.length
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

    setData({ ...data, files: files, filesCombined: filesCombined });
    setStep(step + 1);
  };

  const handleChange = async (e, type) => {
    const filesArr = type === "1" ? files : filesCombined;
    const setFilesHandler = type === "1" ? setFiles : setFilesCombined;
    const isVisible =
      type === "1" ? setIsUploadBlockVisible : setIsUploadBlock2Visible;
    if (!passwordDoc) {
      handleOpenMessage(`נא הזן סיסמא או הזן 0`, "error");
      return;
    }
    if (!e.target.files[0]) return;
    let counter = e.target.files[0].size;
    filesArr.forEach((f) => {
      counter = counter + f.file.size;
    });
    if (counter > 6000000) {
      // prevent upload files higher than 5MB
      handleOpenMessage(`${translation.uploadFilesValidation}`, "warning");
      return;
    }

    const f = {
      file: await convertBase64(e.target.files[0]),
      id: uuidv4(),
      name: e.target.files[0].name,
      passwordDoc: passwordDoc,
      isOcr: handleIsOcr(employeeInfo?.employmentStatus, type),
    };
    setFilesHandler([...filesArr, f]);
    isVisible(false);
    setPasswordDoc("");
  };

  const handleDeleteFile = (id, type) => {
    debugger;
    const filesArr = type === "1" ? files : filesCombined;
    const setFilesArr = type === "1" ? setFiles : setFilesCombined;
    const newFiles = filesArr.filter((f) => f.id !== id);
    setFilesArr(newFiles);
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
        style={{ maxHeight: "82%", overflowY: "auto" }}
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

        {filesCombined.length > 0 ? (
          <div className="mt-4 w-full">
            {filesCombined.map((f) => (
              <File
                key={f.id}
                fileName={f.name}
                onDelete={(e) => handleDeleteFile(e, "0")}
                id={f.id}
              />
            ))}
          </div>
        ) : (
          ""
        )}

        {employeeInfo?.employmentStatus === EMPLOYMENT_STATUS.Combined ? (
          <UploadBlock
            type="0"
            isUploadBlockVisible={isUploadBlock2Visible}
            setIsUploadBlockVisible={setIsUploadBlock2Visible}
            data={data}
            handleChange={handleChange}
            passwordDoc={passwordDoc}
            setPasswordDoc={setPasswordDoc}
            setOtherBlockVisible={setIsUploadBlockVisible}
          />
        ) : (
          ""
        )}

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

        {files.length > 0 ? (
          <div className="mt-4  w-full">
            {files.map((f) => (
              <File
                key={f.id}
                fileName={f.name}
                onDelete={(e) => handleDeleteFile(e, "1")}
                id={f.id}
              />
            ))}
          </div>
        ) : (
          ""
        )}

        <UploadBlock
          type="1"
          isUploadBlockVisible={isUploadBlockVisible}
          data={data}
          handleChange={handleChange}
          passwordDoc={passwordDoc}
          setPasswordDoc={setPasswordDoc}
          setIsUploadBlockVisible={setIsUploadBlockVisible}
          setOtherBlockVisible={setIsUploadBlock2Visible}
        />
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
