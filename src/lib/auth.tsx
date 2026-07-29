"use client";

import * as React from "react";
import type { Role } from "@/lib/data/types";

export interface SessionUser {
  role: Role;
  name: string;
  title: string;
}

export const roleUsers: Record<Role, SessionUser> = {
  admin: { role: "admin", name: "Priya Sharma", title: "Practice Manager · Admin" },
  doctor: { role: "doctor", name: "Dr. Smriti Sharma", title: "Implantologist & Oral Surgeon" },
  receptionist: { role: "receptionist", name: "Amit Verma", title: "Front Desk & Patient Coordinator" },
};

interface AuthCtx {
  user: SessionUser | null;
  ready: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

const Ctx = React.createContext<AuthCtx>({
  user: null,
  ready: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem("cw-role") as Role | null;
      if (saved && roleUsers[saved]) setUser(roleUsers[saved]);
    } catch {}
    setReady(true);
  }, []);

  const login = React.useCallback((role: Role) => {
    setUser(roleUsers[role]);
    try {
      window.localStorage.setItem("cw-role", role);
    } catch {}
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem("cw-role");
    } catch {}
  }, []);

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => React.useContext(Ctx);
