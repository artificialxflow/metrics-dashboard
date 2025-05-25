"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return session ? (
    <div className="d-flex align-items-center gap-2">
      <span className="text-white-50">{session.user?.name}</span>
      <button className="btn btn-outline-light btn-sm" onClick={() => signOut()}>Logout</button>
    </div>
  ) : (
    <button className="btn btn-outline-light btn-sm" onClick={() => signIn("google")}>Login with Google</button>
  );
} 