import { ReactKeycloakProvider } from "@react-keycloak/web";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import keycloak, { keycloakProviderInitConfig } from "./utils/auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakProviderInitConfig}
  >
    <App />
  </ReactKeycloakProvider>
);
