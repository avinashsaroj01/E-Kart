import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

function AdminProtected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && userInfo && userInfo.role != "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default AdminProtected;
