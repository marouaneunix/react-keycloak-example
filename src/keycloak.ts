import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: 'http://keycloak:8080/auth',
  realm: 'portfolio',
  clientId: 'frontend'
});

export default keycloak;
