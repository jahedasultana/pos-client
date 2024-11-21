import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/useAuth";
import { FaSpinner } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div className="h-screen flex justify-center items-center bg-[#e94374f5]/10">
      <FaSpinner className="animate-spin text-5xl text-black mx-auto" />
    </div>
  }

  

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/"} state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;