import { useEffect, useState } from "react";
import { fetchData } from "../api/requests";
import { patientViewRoutes } from "../api/routes";
import SessionList from "../components/SessionList";
import useAuth from "../hooks/useAuth";

function PatientDashboard() {
  const { token, auth } = useAuth();
  const patientId = auth._id;

  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientSessions = async () => {
      try {
        // Fetch data
        const res = await fetchData({
          route: patientViewRoutes.getSessions,
          id: patientId,
          token: token,
        });

        // Pull out the data into a var to make it easier to work with
        const patientSessions = res?.data?.sessions;
        setSessionsLoading(false);
        setSessionsData(patientSessions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientSessions().catch((error) => console.log(error));
  }, [patientId, token]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">Past Sessions</h1>
      {sessionsLoading ? (
        <p>Loading...</p>
      ) : (
        <SessionList
          sessionsData={sessionsData}
          patientId={patientId}
          isPatientView={true}
        />
      )}
    </div>
  );
}

export default PatientDashboard;
