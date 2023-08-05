import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-auth"
      );

      if (res.data.ok) {
        setOk(true);
      } else setOk(false);
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
