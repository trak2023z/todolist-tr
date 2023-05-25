import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Todolists from "./Todolists";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/todolist" element={<Todolists />} />
      <Route path="*" element={<Navigate to="/todolist" />} />
    </Routes>
  );
};

export default AuthenticatedApp;
