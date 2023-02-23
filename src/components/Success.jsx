import { Link, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function Success({}) {
  const { data, setStep, step, isLoading } = useContext(DataContext);

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
          style={{ color: "white", fontSize: "24px", lineHeight: "120%" }}
        >
          הדיווח נשלח בהצלחה
        </Typography>
      </div>
      <Typography className="text-center mt-10" style={{ width: 240 }}>
        במידה ויש שינויים במצבך התעסוקתי, יש לעדכן אותנו בהקדם
      </Typography>
      <Link href="mailto:sfi@sfi.com" underline="always">
        matan@socialfinance.org.il
      </Link>
    </div>
  );
}
