import { 
  PublicClientApplication, 
  Configuration, 
  BrowserCacheLocation 
} from '@azure/msal-browser';

// First, add the relevant configuration for the Azure application
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_APP_REGITRATION_ID', // Azure App Registration (auth-client-app) client ID
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Azure App Registration (auth-client-app) tenant ID
    redirectUri: 'http://localhost:4200', // local client app URLs
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: true,
  },
};

// THEN, DEFINE THE SCOPES YOU NEED FOR THE APPLICATION (Items.Read is the backend app scope to access the items endpoints, 
// this type of scopes control the actions over the backend app)
export const loginRequestData = {
    scopes: ["User.Read", "api://API_APP_REGISTRATION/Items.Read"]
};

// Scopes for the request to the backend app
export const loginRequestItemsData = {
    scopes: ["api://API_APP_REGISTRATION/Items.Read"]
};

export const appMsalInstance = new PublicClientApplication(msalConfig);