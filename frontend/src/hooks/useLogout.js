import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth, setToken, setPracName } = useAuth();
  const navigate = useNavigate();
  return () => {
    localStorage.clear();
    setAuth({});
    setToken({});
    setPracName({});
    navigate("/login");
  };
};

export default useLogout;
