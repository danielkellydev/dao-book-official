import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { pracRoutes } from "../api/routes";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import TitleLockup from "../atoms/TitleLockup";
import useAuth from "../hooks/useAuth";
import MemoFormInput from "../molecules/FormInput";
import { parseJwt } from "../utils.js";
import { useMediaQuery } from "react-responsive";
import { fetchData, sendData } from "../api/requests";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const { auth, setAuth, setToken, setPracName } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await sendData({
        route: pracRoutes.login,
        data: formData,
        method: "POST",
      });

      const token = res.data.token;
      console.log('Received Token:', token);
      const decodedToken = parseJwt(token);
      console.log('Decoded Token:', decodedToken)
      
      const pracNameRes = await fetchData({
        route: pracRoutes.get,
        id: decodedToken._id,
        token: token,
      });

      const { firstName, lastName } = pracNameRes.data.prac;
      const fullName = `${firstName} ${lastName}`;

      // First update React state
      setToken(token);
      setAuth(decodedToken);
      setPracName(fullName);

      // Then store in localStorage
      localStorage.setItem("auth", JSON.stringify(decodedToken));
      localStorage.setItem("authToken", JSON.stringify(res.data.token));
      localStorage.setItem("pracName", JSON.stringify(fullName));

      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        setError({
          status: error.response.status,
          message: "Invalid email or password.",
        });
      } else {
        setError({
          status: error.response.status,
          message: error.response.data.message,
        });
      }
      return;  // Important to return here to avoid further code execution.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <>
    {isMobile ? <Navigate to="/mobile" /> : null}
        <div className="grid h-screen grid-cols-2">
          <div className="flex items-center justify-center bg-daobook-amber p-10">
            <TitleLockup
              isSubtitled={true}
              theme="light"
            />
          </div>
          <div className="flex flex-col flex-wrap content-evenly justify-center gap-4">
            <h1 className="text-6xl">Login</h1>
            <p className="text-2xl">Welcome back to clinic.</p>
            <form
              className="px-15 flex max-w-2xl flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <MemoFormInput
                type="email"
                name="email"
                labelText="Email"
                placeholderText="susan@example.com"
                isRequired={true}
                doesAutocomplete={true}
                onChange={handleChange}
              ></MemoFormInput>
              <MemoFormInput
                type="password"
                name="password"
                labelText="Password"
                placeholderText="*****"
                isRequired={true}
                onChange={handleChange}
              ></MemoFormInput>
              <Button
                theme="light"
                isFullWidth={true}
                buttonText="Login"
              ></Button>
              {error && (
                <>
                  <p className="font-bold">
                  {error.message}
                  </p>
                </>
              )}
            </form>
            <TextLink
              linkText="Sign up here"
              linkDestination={"/register"}
              paragraphText="TCM Practitioner?"
              className="mt-40"
            />
          </div>
          <Button
            buttonText="Patient Login"
            theme="light"
            isFullWidth={false}
            onClick={() => navigate("/mobile/patient-login")}
            otherClasses="w-[200px] absolute right-4 top-4"
          ></Button>
        </div>
    </>
  );
}

export default Login;
