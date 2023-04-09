import ReactDOM from "react-dom/client";
import AuthProvider from "./context/auth/AuthProvider";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);
