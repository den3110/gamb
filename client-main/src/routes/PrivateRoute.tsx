import { isLogin } from "@/helpers/auth";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { routePath } from "./path";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const [shouldLogin, setShouldLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogin()) {
      setShouldLogin(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return !shouldLogin ? children : <Navigate to={routePath.Login} />;
};

export default PrivateRoute;
