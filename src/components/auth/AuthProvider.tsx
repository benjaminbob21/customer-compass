"use client";

/**
 * AuthProvider — unified auth surface for the whole app.
 *
 * Exposes a single `useAuth()` hook regardless of mode:
 *   - Entra mode (when NEXT_PUBLIC_ENTRA_CLIENT_ID is set): real Microsoft
 *     work/school-account SSO via MSAL popup.
 *   - Demo mode (no config): a self-contained simulated session so the product
 *     always demos end-to-end with a signed-in support engineer.
 *
 * The MSAL client is constructed only on the client (inside an effect) to keep
 * it out of server rendering.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PublicClientApplication,
  type AccountInfo,
} from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { isEntraConfigured, loginRequest, msalConfig } from "@/lib/auth/msalConfig";

export interface AuthUser {
  name: string;
  username: string;
  initials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** True when real Entra SSO is wired up. */
  isConfigured: boolean;
  /** True when running the simulated demo session. */
  isDemo: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

function toInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
  return initials || "U";
}

function toUser(account: AccountInfo | null): AuthUser | null {
  if (!account) return null;
  const name = account.name?.trim() || account.username;
  return { name, username: account.username, initials: toInitials(name) };
}

/* -------------------------------------------------------------------------- */
/* Entra (real SSO) mode                                                       */
/* -------------------------------------------------------------------------- */

let msalSingleton: PublicClientApplication | null = null;
function getMsalInstance(): PublicClientApplication {
  if (!msalSingleton) {
    msalSingleton = new PublicClientApplication(msalConfig);
  }
  return msalSingleton;
}

function EntraBridge({ children }: { children: ReactNode }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const active = instance.getActiveAccount() ?? accounts[0] ?? null;

  const signIn = useCallback(() => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        if (res.account) instance.setActiveAccount(res.account);
      })
      .catch((err) => console.error("[auth] sign-in failed", err));
  }, [instance]);

  const signOut = useCallback(() => {
    instance
      .logoutPopup({ account: active ?? undefined })
      .catch((err) => console.error("[auth] sign-out failed", err));
  }, [instance, active]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: isAuthenticated ? toUser(active) : null,
      isConfigured: true,
      isDemo: false,
      signIn,
      signOut,
    }),
    [isAuthenticated, active, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function EntraProvider({ children }: { children: ReactNode }) {
  const [instance, setInstance] = useState<PublicClientApplication | null>(null);

  // Construct MSAL on the client only. Deferring to an effect keeps the first
  // client render identical to the server render (the inert branch below),
  // avoiding a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInstance(getMsalInstance());
  }, []);

  // Before the client-only MSAL instance exists, expose an inert context so
  // consumers never crash and SSR stays clean.
  if (!instance) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isConfigured: true,
          isDemo: false,
          signIn: () => {},
          signOut: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <MsalProvider instance={instance}>
      <EntraBridge>{children}</EntraBridge>
    </MsalProvider>
  );
}

/* -------------------------------------------------------------------------- */
/* Demo mode                                                                   */
/* -------------------------------------------------------------------------- */

const DEMO_USER: AuthUser = {
  name: "Riley Carter",
  username: "riley.carter@contoso.com",
  initials: "RC",
};

function DemoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = useCallback(() => setUser(DEMO_USER), []);
  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isConfigured: false, isDemo: true, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  return isEntraConfigured ? (
    <EntraProvider>{children}</EntraProvider>
  ) : (
    <DemoProvider>{children}</DemoProvider>
  );
}
