import React, { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const SignOut = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutAsync());
  }, [user]);
  return <div>{!user && <Navigate to="/login" replace={true}></Navigate>}</div>;
};

export default SignOut;
