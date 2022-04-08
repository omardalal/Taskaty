import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (requiresAuth) => {
  const loggedUser = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (requiresAuth && loggedUser) {
      return;
    }
    if (!requiresAuth && loggedUser) {
      navigate("/", { replace: true });
      return;
    }
    if (requiresAuth && !loggedUser) {
      navigate("/signUp", { replace: true });
    }
  }, [loggedUser]);
};

export default useAuthRedirect;
