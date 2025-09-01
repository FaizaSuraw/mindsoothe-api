import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "./api/axios";


const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const tokenStr = localStorage.getItem("tokens");
      if (!tokenStr) {
        setIsAuth(false);
        return;
      }
      try {
        const tokens = JSON.parse(tokenStr);
        if (!tokens.access) {
          setIsAuth(false);
          return;
        }
        await api.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${tokens.access}` },
        });
        setIsAuth(true);
      } catch (err) {
        localStorage.removeItem("tokens");
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>; 
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
