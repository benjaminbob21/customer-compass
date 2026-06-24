/**
 * Microsoft Entra ID (Azure AD) configuration for MSAL.
 *
 * SSO activates automatically when these public env vars are present:
 *   NEXT_PUBLIC_ENTRA_CLIENT_ID    — Application (client) ID from the app registration
 *   NEXT_PUBLIC_ENTRA_TENANT_ID    — Directory (tenant) ID, or "organizations" / "common"
 *   NEXT_PUBLIC_ENTRA_REDIRECT_URI — (optional) defaults to the current origin
 *
 * With no client ID set, the app runs in a self-contained demo sign-in mode so
 * the experience is always complete — no configuration required to present it.
 */

import type { Configuration, PopupRequest } from "@azure/msal-browser";

const clientId = process.env.NEXT_PUBLIC_ENTRA_CLIENT_ID ?? "";
const tenantId = process.env.NEXT_PUBLIC_ENTRA_TENANT_ID ?? "organizations";

/** True when an Entra app registration has been wired up. */
export const isEntraConfigured = clientId.trim().length > 0;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri:
      process.env.NEXT_PUBLIC_ENTRA_REDIRECT_URI ??
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

/** Scopes requested at sign-in (Microsoft Graph profile read). */
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};
