import { ReactKeycloakProvider } from "@react-keycloak/web";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/auth/AuthProvider";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import keycloak, { keycloakProviderInitConfig } from "./utils/auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakProviderInitConfig}
  >
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </ReactKeycloakProvider>
);
