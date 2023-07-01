import { TextField } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export function UploadBlock({
  type,
  isUploadBlockVisible,
  setIsUploadBlockVisible,
  data,
  handleChange,
  passwordDoc,
  setPasswordDoc,
  setOtherBlockVisible,
}) {
  const { direction } = data;
  return (
    <>
      {isUploadBlockVisible ? (
        <div className="flex flex-col justify-center w-full mt-2">
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
            onChange={(e) => handleChange(e, type)}
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
      ) : (
        <Button
          variant="outlined"
          color="primary"
          component="span"
          className="rounded-full mt-2"
          style={{
            width: 155,
          }}
          onClick={() => {
            setIsUploadBlockVisible(true);
            setOtherBlockVisible(false);
          }}
        >
          <AddCircleOutlineIcon />
        </Button>
      )}
    </>
  );
}
