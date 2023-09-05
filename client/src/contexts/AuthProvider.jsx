import { createContext, useState, useEffect } from "react";
import { isJwtExpired } from "../utils";

// create ctx
const AuthContext = createContext({});

function safelyParseJSON(json) {
  try {
      return JSON.parse(json);
  } catch {
      return null;
  }
}

function AuthProvider({ children }) {
  const localAuth = safelyParseJSON(localStorage.getItem("auth"));
  const localToken = safelyParseJSON(localStorage.getItem("authToken"));
  const localPracName = safelyParseJSON(localStorage.getItem("pracName"));
  const [auth, setAuth] = useState(localAuth);
  const [token, setToken] = useState(localToken);
  const [pracName, setPracName] = useState(localPracName);


  // This checks that the auth isn't expired
  useEffect(() => {
    if (auth && typeof auth === 'string' && isJwtExpired(auth)) {
      console.log("Token is expired. Resetting auth.");
      setAuth(null);
    }
}, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken, pracName, setPracName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
