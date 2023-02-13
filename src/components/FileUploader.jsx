import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, Typography } from "@mui/material";
import { File } from "./File";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EMPLOYMENT_STATUS } from "../Interface/EmploymentStatus";

export function FileUploader({}) {
  const { data, setStep, step, setData } = useContext(DataContext);
  const { direction, employeeInfo } = data;
  const [files, setFiles] = useState(data?.files ?? []);

  const handleTitle = () => {
    if (employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Not_Employed) {
      return "יש לעלות תלושי שכר מביטוח לאומי";
    } else if (employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Combined) {
      return "X-X יש לעלות תלושי שכר עבור חודשים ";
    } else if (employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Employee) {
      return "X-X יש לעלות תלושי שכר עבור חודשים ";
    } else if (
      employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Independent
    ) {
      return "X-X יש להעלות חשבונית עבור חודשים ";
    }
  };

  const handleNextStep = () => {
    if (files.length === 0) {
      alert("please upload relevant files - יש לעלות מסמכים נדרשים להמשך");
      return;
    }
    setData({ ...data, files: files });
    setStep(step + 1);
  };

  const handleChange = async (e) => {
    if (!e.target.files[0]) return;
    let counter = e.target.files[0].size;
    files.forEach((f) => {
      counter = counter + f.file.size;
    });
    if (counter > 6000000) {
      // prevent upload files higher than 5MB
      alert("לא ניתן לעלות קבצים הגדולים מ 6 מגה-בייט");
      return;
    }
    const f = {
      file: await convertBase64(e.target.files[0]),
      id: e.target.files[0].name,
    };
    setFiles([...files, f]);
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
        <Typography className="text-center ">{handleTitle()}</Typography>

        {employeeInfo.employmentStatus === EMPLOYMENT_STATUS.Combined ? (
          <Typography className="text-center ">
            X-X יש להעלות חשבונית עבור חודשים
          </Typography>
        ) : (
          ""
        )}

        <div className="mt-6 w-full">
          {files.map((f) => (
            <File
              key={f.id}
              fileName={f.id}
              onDelete={handleDeleteFile}
              id={f.id}
            />
          ))}
        </div>

        <div className="mt-6">
          <input
            type="file"
            accept="*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              className="rounded-full "
              style={{
                width: 155,
              }}
            >
              Upload
              <UploadIcon />
            </Button>
          </label>
        </div>
        <Typography
          className="text-center underline mt-6 "
          style={{ cursor: "pointer" }}
          onClick={() => {
            alert("paste link to redirect");
          }}
        >
          לעזרה בהעלאת קבצים
        </Typography>
      </div>
      <div className="flex flex-row justify-between w-full">
        <Button
          className=" rounded-full bg-blue-500 flex flex-row self-start "
          variant="contained"
          style={{ direction: direction }}
          disabled={files.length === 0}
          onClick={() => handleNextStep()}
        >
          אפשר להמשיך
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
