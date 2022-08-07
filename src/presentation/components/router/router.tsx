import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/presentation/pages";

interface RouterProps {}

const Router: React.FC = (props: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login">
          <Login />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
