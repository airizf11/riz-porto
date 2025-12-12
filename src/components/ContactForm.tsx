// src/components/ContactForm.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Send, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

// Server Action Import
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/(public)/contact/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Initial State buat useActionState
const initialState: ContactFormState = {
  message: "",
  errors: {},
  success: false,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  // --- SUCCESS VIEW ---
  if (state.success) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              Message Sent!
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Thank you for reaching out. I'll get back to you as soon as
              possible.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // --- FORM VIEW ---
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              className={
                state.errors?.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
              disabled={isPending}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              className={
                state.errors?.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
              disabled={isPending}
            />
            {state.errors?.email && (
              <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              className={`min-h-[150px] resize-none ${
                state.errors?.message
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              disabled={isPending}
            />
            {state.errors?.message && (
              <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* General Error Message (e.g. Database fail) */}
          {state.message && !state.success && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {state.message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-bold text-base h-11"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
