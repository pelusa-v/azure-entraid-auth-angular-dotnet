import { PublicClientApplication, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

// FIRST, ADD RELEVANT CONFIGURATION OF AZURE APPLICATION
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_APP_REGITRATION_ID', // Azure App Registration client ID
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Azure App Registration tenant ID
    redirectUri: 'http://localhost:4200', // local app URLs
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Store tokens in localStorage
    storeAuthStateInCookie: true,
  },
};

// THEN, DEFINE THE SCOPES YOU NEED FOR THE APPLICATION (items.read is the backend app scope to access the items endpoints, this type of scopes control the actions over the backend app)
export const loginRequestData = {
    scopes: ["User.Read", "api://API_APP_REGISTRATION/Items.Read"]
};

export const loginRequestItemsData = {
    scopes: ["api://API_APP_REGISTRATION/Items.Read"]
};

export const appMsalInstance = new PublicClientApplication(msalConfig);