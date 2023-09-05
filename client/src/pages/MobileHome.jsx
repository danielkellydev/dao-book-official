import TitleLockup from "../atoms/TitleLockup";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
function MobileHome() {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[minmax(150px,_25%)_2fr]">
      <div className="flex items-center justify-center bg-daobook-amber">
        <TitleLockup
          isSubtitled={false}
          theme="light"
        />
      </div>
      <div className="mx-[10%] flex flex-col flex-wrap content-evenly justify-center gap-4">
        <p className="text-center text-2xl font-bold">
          Mobile view is only available for patients.
        </p>
        <Button
          theme="light"
          isFullWidth={true}
          buttonText="Patient Login"
          onClick={() => navigate("patient-login")}
        ></Button>
      </div>
    </div>
  );
}

export default MobileHome;
