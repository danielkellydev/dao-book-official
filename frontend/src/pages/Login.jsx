import { useState } from "react";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const { auth, setAuth, setToken, setPracName } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    try {
      // Post form data
      const res = await sendData({
        route: pracRoutes.login,
        data: formData,
        method: "POST",
      });

      // Receive JWT and store in both ctx & storage
      const token = res.data.token;
      const decodedToken = parseJwt(token);
      setToken(token);
      setAuth(decodedToken);
      localStorage.setItem("auth", JSON.stringify(decodedToken));
      localStorage.setItem("authToken", JSON.stringify(res.data.token));
      // Use token to fetch practitioner name
      const pracNameRes = await fetchData({
        route: pracRoutes.get,
        id: decodedToken._id,
        token: token,
      });

      // Store full name in ctx & storage
      const { firstName, lastName } = pracNameRes.data.prac;
      const fullName = `${firstName} ${lastName}`;
      setPracName(fullName);
      localStorage.setItem("pracName", JSON.stringify(fullName));

      // Redirect
      navigate("/");
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const handleChange = (e) => {
    setError(null);
    const name = e.target.name;
    const value = e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  if (isMobile) {
    return <Navigate to="/mobile" />;
  }

  return (
    <>
      {auth ? (
        <Navigate to="/" />
      ) : (
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
                    Something went wrong, please try again.
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
      )}
    </>
  );
}

export default Login;
