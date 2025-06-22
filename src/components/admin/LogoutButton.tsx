// src/components/admin/LogoutButton.tsx
"use client";

import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="px-4 py-2 border border-light/50 text-light/80 rounded-lg hover:bg-light/10 hover:text-light transition-colors"
      >
        Log Out
      </button>
    </form>
  );
}
