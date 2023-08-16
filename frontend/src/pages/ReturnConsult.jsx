import { useEffect, useState } from "react";
import {
  patientRoutes,
  sessionRoutes,
  prescriptionRoutes,
} from "../api/routes";
import ConsultForm from "../components/ConsultForm";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom/dist";
import { dateTimeToDate } from "../utils";
import { fetchData, sendData } from "../api/requests";

function ReturnConsult() {
  // Hooks
  const errorHandler = useErrorHandler();
  const { token, auth } = useAuth();

  // If we arrived here from patientList, we should have a patient already active
  const location = useLocation();
  const selectedPatientId = location.state?.selectedPatientId;
  const selectedSessionId = location.state?.selectedSessionId;

  // State
  const [formData, setFormData] = useState({
    patientId: selectedPatientId || "",
    sessionId: selectedSessionId || "",
    prescriptionId: "",
    sessionDate: "",
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
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [error, setError] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetchData({
          route: patientRoutes.getAll,
          id: auth._id,
          token: token,
        });
        setPatients(res.data.patients);

        // If this exists, we're editing, so we need to set the name and hide the select
        if (selectedPatientId) {
          setActivePatient(
            res.data.patients.find((patient) => {
              return patient._id === selectedPatientId;
            })
          );
        }
      } catch (error) {
        errorHandler(error, setError);
      }
    };

    // If we're editing, we need to get previous data
    const fetchSessionDetails = async () => {
      try {
        const sessionRes = await fetchData({
          route: sessionRoutes.getOne,
          id: selectedSessionId,
          token: token,
        });
        const returnedSessionData = sessionRes.data?.session;

        const prescriptionRes = await fetchData({
          route: prescriptionRoutes.getOne,
          id: selectedSessionId,
          token: token,
        });
        const returnedPrescriptionData = prescriptionRes.data?.prescriptions[0];

        let prevSessionDate;

        if (returnedSessionData.sessionDate) {
          prevSessionDate = dateTimeToDate(returnedSessionData.sessionDate);
        }

        const newSessionData = {
          sessionDate: prevSessionDate || returnedSessionData?.sessionDate,
          sessionNotes: returnedSessionData?.sessionNotes,
          tongue: returnedSessionData?.tongue,
          pulse: returnedSessionData?.pulse,
          mainComplaint: returnedSessionData?.mainComplaint,
          prescriptionId: returnedPrescriptionData?._id,
          formulaName: returnedPrescriptionData?.formulaName,
          composition: returnedPrescriptionData?.composition,
          dosageAdministration: returnedPrescriptionData?.dosageAdministration,
          lifestyleAdvice: returnedPrescriptionData?.lifestyleAdvice,
          sendEmail: false,
        };

        setFormData({
          ...formData,
          ...newSessionData,
        });
      } catch (error) {
        console.log(error);
        errorHandler(error, setError);
      }
    };

    fetchPatients();

    // If there is a session, we need to fetch session details. We're editing
    if (selectedSessionId) {
      fetchSessionDetails();
    }
  }, []);

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Unpack into two objects as we send 2x requests
    const sessionData = {
      practitionerId: auth._id,
      sessionDate: formData.sessionDate,
      patientId: formData.patientId,
      mainComplaint: formData.mainComplaint,
      sessionNotes: formData.sessionNotes,
      tongue: formData.tongue,
      pulse: formData.pulse,
    };

    const prescriptionData = {
      practitionerId: auth._id,
      patientId: formData.patientId,
      sessionId: formData.sessionId || "",
      formulaName: formData.formulaName,
      composition: formData.composition,
      dosageAdministration: formData.dosageAdministration,
      lifestyleAdvice: formData.lifestyleAdvice,
      sendEmail: formData.sendEmail,
    };

    // If there's a session, we're editing, so put requests
    if (selectedSessionId) {
      try {
        const sessionRes = await sendData({
          route: sessionRoutes.put,
          id: formData.sessionId,
          token: token,
          data: sessionData,
          method: "PUT",
        });

        const prescriptionRes = await sendData({
          route: prescriptionRoutes.put,
          id: formData.prescriptionId,
          token: token,
          data: prescriptionData,
          method: "PUT",
        });
      } catch (error) {
        errorHandler(error, setError);
      }
    } else {
      // If there's no session, this is a new session, so we post
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
      } catch (error) {
        errorHandler(error, setError);
      }
    }
    setIsSaved(true);
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // This ensures that the button isn't active when we are on the default select.
  // Clunky but I don't know a way around this check.
  let buttonShouldBeDisabled;

  if (formData.patientId === "" || formData.patientId === "Select Patient") {
    buttonShouldBeDisabled = true;
  }

  return (
    <div className="flex flex-col">
      <h1 className="my-20 text-center text-4xl">Return Consult Form</h1>
      <div className="px-15 min-w-[500px] gap-4 text-center">
        {activePatient ? (
          <h1 className="text-center text-2xl">
            {activePatient.firstName} {activePatient.lastName}
          </h1>
        ) : (
          <>
            <label htmlFor="patientName text-xl">Patient: </label>
            <select
              name="patientId"
              id="patientId"
              className="rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
              onChange={(e) => handleChange(e)}
              value={formData.patientId}
            >
              <option>Select Patient</option>
              {patients.map((patient) => (
                <option
                  value={patient._id}
                  key={patient._id}
                >
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <ConsultForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isInitialConsult={false}
        isDisabled={buttonShouldBeDisabled}
        isSaved={isSaved}
      />
      {error && <p className="text-center font-bold">{error.message}</p>}
    </div>
  );
}

export default ReturnConsult;
