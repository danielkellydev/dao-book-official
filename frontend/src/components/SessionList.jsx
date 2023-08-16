import { Link } from "react-router-dom";

function SessionList({ sessionsData, patientId, isPatientView }) {
  const destinationLocation = isPatientView ? "session/" : "/return-consult";
  return (
    <>
      {sessionsData ? (
        <div className="mt-4 flex flex-col gap-4">
          {sessionsData.map((session) => {
            return (
              <Link
                to={destinationLocation}
                key={session._id}
                state={{
                  selectedSessionId: session._id,
                  selectedPatientId: patientId,
                }}
                className="rounded-2xl border-4 border-[#E3E3E3] bg-white px-2 py-2 font-sans font-semibold text-black shadow-md transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
              >
                {new Date(session.sessionDate).toLocaleDateString("au", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Link>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionList;
