import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { patientRoutes } from "../api/routes";
import useAuth from "../hooks/useAuth";
import { fetchData } from "../api/requests";

function PatientList() {
  const { token, auth, pracName } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetchData({
          route: patientRoutes.getAll,
          id: auth._id,
          token: token,
        });
        setPatients(res?.data?.patients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatients().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-20 text-center text-4xl">
        Patient List for {pracName ? `Dr. ${pracName}.` : "Doctor."}
      </h1>
      <ul className="flex flex-col items-center gap-7">
        {patients &&
          patients.map((patient) => {
            return (
              <li
                className="min-w-[600px]"
                key={patient._id}
              >
                <Link
                  to={`/patient-list/${patient._id}`}
                  className="block w-full rounded-2xl border-4 border-[#E3E3E3] bg-white px-2 py-6 text-center font-sans font-semibold text-black shadow-md transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
                >
                  {patient.firstName} {patient.lastName}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default PatientList;
