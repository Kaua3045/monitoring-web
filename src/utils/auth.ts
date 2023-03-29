import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
});

export const keycloakProviderInitConfig = {
  onLoad: "check-sso",
};

export default keycloak;
