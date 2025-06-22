// src/app/login/page.tsx
"use client";

import { useFormStatus } from "react-dom";
import { authenticate } from "./actions";
import { useActionState } from "react";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed"
    >
      {pending ? "Logging in..." : "Log In"}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-dark text-light">
      <div className="w-full max-w-sm">
        <h1 className="heading text-4xl text-center text-accent mb-8">
          Mudir Panel
        </h1>
        <form action={formAction} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-4 bg-dark/50 border-2 border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-4 bg-dark/50 border-2 border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>
          <LoginButton />
          {errorMessage && (
            <p className="text-red-400 text-sm text-center mt-2">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
