import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pracRoutes } from "../api/routes";
import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import TitleLockup from "../atoms/TitleLockup";
import MemoFormInput from "../molecules/FormInput";
import { sendData } from "../api/requests";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    AHPRA: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendData({
        route: pracRoutes.register,
        data: formData,
        method: "POST",
      });
      setIsSuccessLoading(true);
      setTimeout(() => {
        setIsSuccessLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="grid h-screen grid-cols-2">
      <div className="flex items-center justify-center bg-daobook-amber p-10">
        <TitleLockup
          isSubtitled={true}
          theme="light"
        />
      </div>
      <div className="flex flex-col flex-wrap content-center justify-center gap-4">
        <h1 className="text-center text-4xl">Practitioner Registration</h1>
        <form
          className="px-15 flex max-w-2xl flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <MemoFormInput
            type="text"
            name="firstName"
            labelText="First Name"
            placeholderText="Susan"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <MemoFormInput
            type="text"
            name="lastName"
            labelText="Last Name"
            placeholderText="Reynolds"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <MemoFormInput
            type="email"
            name="email"
            labelText="Email"
            placeholderText="susan@example.com"
            isRequired={true}
            onChange={handleChange}
          ></MemoFormInput>
          <MemoFormInput
            type="text"
            name="AHPRA"
            labelText="AHPRA no."
            placeholderText="1336"
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
          {error && (
            <>
              <p>{error.message}</p>
              {error.status === 400 ? (
                <TextLink
                  linkDestination="/login"
                  linkText="Login"
                />
              ) : (
                <></>
              )}
            </>
          )}
          <Button
            theme="light"
            isFullWidth={true}
            buttonText="Register"
          ></Button>
          {isSuccessLoading && (
            <p className="z-10 text-center text-xl text-daobook-amber">
              Registered. Redirecting...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
