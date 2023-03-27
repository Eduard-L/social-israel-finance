import { Link, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export function Success({}) {
  const { data, setStep, step, isLoading } = useContext(DataContext);
  const { translation } = data;

  const circleStyles = {
    backgroundColor: "#4091df",
    width: 200,
    height: 200,
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col justify-center items-center rounded-full"
        style={circleStyles}
      >
        <DoneIcon style={{ color: "white", fontSize: 50 }} />
        <Typography
          className="text-center "
          style={{ color: "white", fontSize: "21px", lineHeight: "120%" }}
        >
          {translation.sentSuccesfully}
        </Typography>
      </div>
      <Typography className="text-center mt-10" style={{ width: 240 }}>
        {translation.ifChangedStatus}
      </Typography>
      <Link href="mailto:sfi@sfi.com" underline="always">
        matan@socialfinance.org.il
      </Link>
    </div>
  );
}
