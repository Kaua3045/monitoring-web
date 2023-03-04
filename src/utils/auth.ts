import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081/auth/",
  clientId: "authorization",
  realm: "teste",
});

export const keycloakProviderInitConfig = {
  onLoad: "check-sso",
};

export default keycloak;
