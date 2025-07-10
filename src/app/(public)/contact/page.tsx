// src/app/(public)/contact/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "./actions";
import { ContactInfo } from "@/components/ContactInfo";
import Link from "next/link";

const initialState = {
  message: "",
  errors: {},
  success: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="heading text-4xl text-accent mb-4">Thank You!</h1>
        <p className="text-xl text-light/80">{state.message}</p>
        <Link
          href="/"
          className="mt-8 px-5 py-2 border-2 border-light/50 text-light font-bold rounded-lg transition-colors hover:bg-light/10"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="text-light/70 hover:text-light mb-8 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="heading text-5xl md:text-6xl text-center mb-4">
          Let's <span className="text-secondary">Connect</span>
        </h1>
        <p className="text-center text-light/70 mb-12">
          Have a project in mind or just want to say hi? Fill out the form
          below.
        </p>
        <form action={formAction} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-4 bg-dark/50 border-2 border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
            {state.errors?.name && (
              <p className="text-red-400 text-sm mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-4 bg-dark/50 border-2 border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
            {state.errors?.email && (
              <p className="text-red-400 text-sm mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              className="w-full p-4 bg-dark/50 border-2 border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            ></textarea>
            {state.errors?.message && (
              <p className="text-red-400 text-sm mt-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>
          <SubmitButton />
          {state.message && !state.success && (
            <p className="text-red-400 text-sm text-center">{state.message}</p>
          )}
        </form>
        <ContactInfo />
      </div>
    </div>
  );
}
