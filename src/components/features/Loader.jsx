import { Oval } from "react-loader-spinner";

export function Loader({}) {
  return (
    <>
      <Oval
        height={30}
        width={30}
        color="#4091df"
        wrapperStyle={{ position: "absolute", left: 10, top: 10 }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="lightblue"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </>
  );
}
