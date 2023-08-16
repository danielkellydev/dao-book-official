import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { prescriptionRoutes, sessionRoutes } from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";
import { sendData } from "../api/requests";


function InitialConsult() {
  // Hooks
  const locationState = useLocation().state;
  const patientId = locationState?.patientId;
  const errorHandler = useErrorHandler();
  const { token } = useAuth();

  // State
  const todaysDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    sessionDate: todaysDate,
    mainComplaint: "",
    sessionNotes: "",
    tongue: "",
    pulse: "",
    formulaName: "",
    composition: "",
    dosageAdministration: "",
    lifestyleAdvice: "",
    sendEmail: false,
  });
  const [error, setError] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      patientId,
      sessionDate: formData.sessionDate,
      mainComplaint: formData.mainComplaint,
      sessionNotes: formData.sessionNotes,
      tongue: formData.tongue,
      pulse: formData.pulse,
    };

    const prescriptionData = {
      patientId,
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
      sendEmail: formData.sendEmail,
    };

    try {
      const sessionRes = await sendData({
        route: sessionRoutes.create,
        token: token,
        data: sessionData,
        method: "POST",
      });

      // Use returned sessionId to send prescription
      const sessionId = sessionRes.data.session._id;
      prescriptionData.sessionId = sessionId;

      const prescriptionRes = await sendData({
        route: prescriptionRoutes.create,
        token: token,
        data: prescriptionData,
        method: "POST",
      });

      setIsSaved(true);
    } catch (error) {
      errorHandler(error, setError);
    }
  };

  const handleChange = (e) => {
    setError(null);
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Can only reach page from initial-patient page
  if (!patientId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="my-20 text-center text-4xl">Initial Consult Form</h1>
      <ConsultForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={true}
        isSaved={isSaved}
      />
      {error && <p className="text-center font-bold">{error.message}</p>}
    </div>
  );
}

export default InitialConsult;
