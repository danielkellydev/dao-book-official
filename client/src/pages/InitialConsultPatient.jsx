import { useState } from "react";
import { patientRoutes } from "../api/routes";
import PatientInfoForm from "../components/PatientInfoForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { sendData } from "../api/requests";

function InitialConsultPatient() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    medications: "",
    history: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendData({
        route: patientRoutes.create,
        token: token,
        data: formData,
        method: "POST",
      });
      // useLocation() hook to get this data in the next page
      setError("");
      navigate("/initial-session", {
        state: { patientId: res.data.patient._id },
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        setError(
          "A matching patient already exists. Double-check name, email and birthday."
        );
      } else {
        setError(error.message);
      }
    }
  };

  const handleChange = (e) => {
    setError("");
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <PatientInfoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={true}
      />
      {error && <p className="mt-2">{error}</p>}
      <hr className="my-20" />
    </div>
  );
}

export default InitialConsultPatient;
