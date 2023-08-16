import { useLocation, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();
  const dashboardRoute = auth?.isPatient ? "/mobile/patient-dashboard" : "/";

  // Only show dashboard button when not on dashboard
  const isNotOnDashboard = location.pathname !== dashboardRoute;
  const noHeader = ["/register", "/login", "/mobile/patient-login", "/mobile"];

  // No header on these pages
  if (noHeader.includes(location.pathname)) {
    return <></>;
  }

  return (
    <header className="flex flex-col place-content-between items-center bg-daobook-amber p-6 md:flex-row">
      <TitleLockup
        theme="light"
        isSubtitled={false}
        isSmall={true}
      ></TitleLockup>
      <div className="inline-flex gap-7">
        {isNotOnDashboard && (
          <Button
            theme="inverted"
            buttonText="Dashboard"
            onClick={() => {
              navigate(dashboardRoute);
            }}
          ></Button>
        )}
        <Button
          theme="light"
          buttonText="Logout"
          onClick={logout}
        ></Button>
      </div>
    </header>
  );
}

export default Header;
