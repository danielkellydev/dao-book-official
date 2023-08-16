import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patientViewRoutes } from "../api/routes";
import useErrorHandler from "../hooks/errorHandler";
import useAuth from "../hooks/useAuth";
import { dateTimeToDate } from "../utils";
import DetailDisplay from "../molecules/DetailDisplay";
import Button from "../atoms/Button";
import { fetchData } from "../api/requests";

function PatientSessions() {
  // Hooks
  const { token } = useAuth();
  const location = useLocation();
  const selectedPatientId = location.state?.selectedPatientId;
  const selectedSessionId = location.state?.selectedSessionId;
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const [sessionData, setSessionData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const sessionRes = await fetchData({
          route: patientViewRoutes.getOneSession,
          id: selectedSessionId,
          token: token,
        });
        const returnedSessionData = sessionRes.data?.session;

        const prescriptionRes = await fetchData({
          route: patientViewRoutes.getPrescriptions,
          id: selectedPatientId,
          token: token,
        });
        const returnedPrescriptionData = prescriptionRes.data?.prescriptions;

        // Backend returns all prescriptions, here we filter
        const currentPrescription = returnedPrescriptionData.find(
          (el) => el.sessionId === selectedSessionId
        );

        let prevSessionDate;

        if (returnedSessionData.sessionDate) {
          prevSessionDate = dateTimeToDate(returnedSessionData.sessionDate);
        }

        const newSessionData = {
          sessionDate: prevSessionDate || "",
          sessionNotes: returnedSessionData?.sessionNotes,
          tongue: returnedSessionData?.tongue,
          pulse: returnedSessionData?.pulse,
          mainComplaint: returnedSessionData?.mainComplaint,
          formulaName: currentPrescription?.formulaName,
          composition: currentPrescription?.composition,
          dosageAdministration: currentPrescription?.dosageAdministration,
          lifestyleAdvice: currentPrescription?.lifestyleAdvice,
        };

        setSessionData(newSessionData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        errorHandler(error, setError);
      }
    };
    fetchSessionDetails();
  }, []);

  return (
    <div className="mx-8">
      <div className="flex flex-col">
        {error && <p>{error}</p>}
        {loading ? (
          <p className="mt-4 text-center text-2xl font-bold">Loading...</p>
        ) : (
          <>
            <h1 className="mx-2 my-10 text-center text-4xl">
              Prescription notes from{" "}
              {new Date(sessionData?.sessionDate).toLocaleDateString("au", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
            </h1>
            <div className="m-auto max-w-[500px]">
              <DetailDisplay
                labelText="Formula name"
                valueText={sessionData.formulaName}
                isRequired={true}
              ></DetailDisplay>
              <DetailDisplay
                labelText="Composition"
                valueText={sessionData.composition}
              ></DetailDisplay>
              <DetailDisplay
                labelText="Dosage & administration"
                valueText={sessionData.dosageAdministration}
              ></DetailDisplay>
              <DetailDisplay
                labelText="Lifestyle notes"
                isRequired={true}
                valueText={sessionData.lifestyleAdvice}
              ></DetailDisplay>
            </div>
          </>
        )}
        <Button
        buttonText="Back"
        onClick={() => navigate(-1)}
      />
      </div>
    </div>
  );
}

export default PatientSessions;
