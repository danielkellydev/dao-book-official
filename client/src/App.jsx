import DashboardButton from "./atoms/DashboardButton";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { pracName } = useAuth();
  const pracFirstName = pracName?.split(" ")[0];
  const capitalisedPracFirstName = pracFirstName?.charAt(0).toUpperCase() + pracFirstName?.slice(1);
  const navigate = useNavigate();

  const initialConsultClick = () => {
    navigate("/initial-consult");
  };

  const returnConsultClick = () => {
    navigate("/return-consult");
  };

  const patientListClick = () => {
    navigate("/patient-list");
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-7">
      <h1 className="text-4xl">
        Welcome to your clinic dashboard{" "}
        {pracName ? `${capitalisedPracFirstName}.` : "Doctor."}{" "}
      </h1>
      <div className="flex gap-7">
        <DashboardButton
          buttonText="Initial Consult"
          onClick={initialConsultClick}
        />
        <DashboardButton
          buttonText="Return Consult"
          onClick={returnConsultClick}
        />
        <DashboardButton
          buttonText="Patient List"
          onClick={patientListClick}
        />
      </div>
    </div>
  );
}