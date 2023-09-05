import { useNavigate } from "react-router-dom";
import useLogout from "./useLogout";

const useErrorHandler = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  function errorHandler(error, setError) {
    if (error.response?.data?.message === "jwt expired") {
      logout();
      navigate("/login");
    }
    setError({
      status: error.response?.status,
      message: error.response?.data?.message,
    });
  }

  return errorHandler;
};

export default useErrorHandler;
