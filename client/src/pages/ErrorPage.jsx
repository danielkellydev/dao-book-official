import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="mt-5 flex flex-col items-center gap-4">
      <p className="text-center text-2xl font-bold">Sorry, page not found.</p>
      <Button
        buttonText="Home?"
        theme="light"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}

export default ErrorPage;
