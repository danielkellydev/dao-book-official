import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, sendData } from "../api/requests";
import { patientRoutes, sessionRoutes } from "../api/routes";
import TextLink from "../atoms/TextLink";
import PatientInfoSubform from "../components/PatientInfoForm";
import SessionList from "../components/SessionList";
import useAuth from "../hooks/useAuth";
import { dateTimeToDate } from "../utils";

function PatientDetails() {
  const { token } = useAuth();
  let params = useParams();
  const patientId = params.patientId;

  // Fetch patient info
  const [patientInfo, setPatientInfo] = useState({});
  const [infoLoading, setInfoLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch sessions
  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  // Fetch initial patient data
  useEffect(() => {
    // Async function to allow us to await in useEffect
    const fetchPatientDetails = async () => {
      try {
        // Fetch data
        const res = await fetchData({
          route: patientRoutes.getOne,
          id: patientId,
          token: token,
        });

        // Pull out the data into a var to make it easier to work with
        const currentData = res.data.patient;
        // Fix date field to only contain date, otherwise it contains time info too
        if (currentData.dateOfBirth) {
          currentData.dateOfBirth = dateTimeToDate(currentData?.dateOfBirth);
        }
        setInfoLoading(false);
        setPatientInfo(currentData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPatientSessions = async () => {
      try {
        // Fetch data
        const res = await fetchData({
          route: sessionRoutes.getPatients,
          id: patientId,
          token: token,
        });

        // Pull out the data into a var to make it easier to work with
        const patientSessions = res?.data?.sessions;
        setSessionsLoading(false);
        setSessionsData(patientSessions);
        // Fix date field to only contain date, otherwise it contains time info too
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientDetails().catch((error) => console.log(error));
    fetchPatientSessions().catch((error) => console.log(error));
  }, [patientId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendData({
        route: patientRoutes.put,
        id: patientId,
        token: token,
        data: patientInfo,
        method: "PUT",
      });
    } catch (error) {
      setError(error);
    }
    setIsSaved(true);
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setPatientInfo((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Patient Profile</h1>
      {error && <p>{error.data.message}</p>}
      {infoLoading ? (
        <p>Loading...</p>
      ) : (
        <PatientInfoSubform
          formData={patientInfo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isInitialConsult={false}
          isSaved={isSaved}
        />
      )}

      {sessionsLoading ? (
        <p>Loading</p>
      ) : (
        <SessionList
          sessionsData={sessionsData}
          patientId={patientId}
          isPatientView={false}
        />
      )}
      <TextLink
        linkText={"Back to patient list"}
        linkDestination={"/patient-list"}
        className={"my-10 text-center"}
      ></TextLink>
      <div className="mb-10"></div>
    </div>
  );
}

export default PatientDetails;
