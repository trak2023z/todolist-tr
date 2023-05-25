import React from "react";
import { useSelector } from "react-redux";
import AuthenticatedApp from "./AuthenticatedApp";
import UnAuthenticatedApp from "./UnAuthenticatedApp";

const Root = () => {
  const { auth_token } = useSelector((state) => state.auth.authData);
  return auth_token ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
};

export default Root;
