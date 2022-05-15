import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAuthRedirect = (requiresAuth) => {
  const loggedUser = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedUser?.pending) {
      return;
    }
    if (requiresAuth && loggedUser?.user) {
      return;
    }
    if (!requiresAuth && loggedUser?.user) {
      navigate("/", { replace: true });
      return;
    }
    if (requiresAuth && !loggedUser?.user) {
      navigate("/signUp", { replace: true });
    }
  }, [loggedUser]);

  return loggedUser;
};

export default useAuthRedirect;
