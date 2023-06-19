import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { QANDA_EN, QANDA_HE } from "../../helpers/translations";

export default function DialogQuestionsAndAnswers({
  open,
  handleClose,
  isEnglish,
  direction,
  translation,
}) {
  const questionsAndAnswersObject = isEnglish ? QANDA_EN : QANDA_HE;
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        style={{ direction: "rtl" }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="flex flex-col justify-center items-center rounded-full"
      >
        <DialogTitle
          className="text-center"
          style={{ fontSize: "38px" }}
          id="alert-dialog-title"
        >
          {translation?.QandA}
        </DialogTitle>
        <DialogContent>
          {questionsAndAnswersObject.map((b, i) => {
            return (
              <div className={i !== 0 ? "mt-6" : " "} key={b.question}>
                <h2 className="font-bold">
                  {i + 1}. {b.question}
                </h2>
                <p className="mt-1">{b.answer}</p>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
