import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Metrics from "../pages/Metrics";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/metrics/:id" element={<Metrics />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/metrics/:id"
          element={
            <PrivateRoute>
              <Metrics />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
