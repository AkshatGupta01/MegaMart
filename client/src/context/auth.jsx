import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth.js";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //setting default axios headers
  axios.defaults.headers.common.Authorization = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
