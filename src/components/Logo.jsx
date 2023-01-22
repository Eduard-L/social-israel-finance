import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import { Typography } from "@mui/material";

export function Logo() {
  const iconStyles = {
    width: 60,
    height: 60,
  };

  const textStyle = {
    fontWeight: "bold",
    fontSize: 15,
  };

  return (
    <div className="flex flex-row">
      <CircleIcon sx={iconStyles} />
      <SquareIcon sx={iconStyles} />
      <div className="flex flex-col justify-center p-1">
        <Typography style={textStyle}>SOCIAL</Typography>
        <Typography style={{ ...textStyle, transform: "translate(0px, -8px)" }}>
          FINANCE
        </Typography>
        <Typography
          style={{ ...textStyle, transform: "translate(0px, -15px)" }}
          color="primary"
        >
          ISRAEL
        </Typography>
      </div>
    </div>
  );
}

//transform: translate(0px, -16px);
//,transform: 'translate(0px, -8px)'
