import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const loggedUser = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(
    () => navigate(loggedUser ? "/" : "/signUp", { replace: true }),
    [loggedUser]
  );
};

export default useAuthRedirect;
