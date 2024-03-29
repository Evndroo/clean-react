import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/presentation/pages";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
