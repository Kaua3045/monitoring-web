import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoutes";
import Register from "./Register";
import SecuredPage from "./Secured";

function App() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div className="w-screen h-screen text-gray-600 text-xl flex justify-center items-center">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/secured"
            element={
              <PrivateRoute>
                <SecuredPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
