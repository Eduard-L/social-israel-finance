import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Typography } from "@mui/material";
import { Loader } from "../features/Loader";
export function File({ isLoading, fileName, onDelete, id }) {
  const textoverflow = {
    width: "70%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    direction: "rtl",
  };
  const iconstyles = {
    width: 30,
    height: 30,
  };
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <CheckCircleOutlineIcon style={{ ...iconstyles, color: "#4091df" }} />
      )}
      <Typography className="text-center " style={textoverflow}>
        {fileName}
      </Typography>
      <HighlightOffIcon
        style={{ ...iconstyles, color: "lightgrey", cursor: "pointer" }}
        onClick={() => onDelete(id)}
      />
    </div>
  );
}
