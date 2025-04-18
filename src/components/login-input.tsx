"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/utils/cn";
import { MovingBorderContainer } from "@/components/ui/moving-border";

export default function LoginInput() {
  const [email, setEmail] = React.useState("");
  const isEmailValid = email === process.env.NEXT_PUBLIC_WHITELISTED_EMAIL;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="user@email.com" type="email" value={email} onChange={handleEmailChange} required />
      </LabelInputContainer>

      <LoginLink
        authUrlParams={{
          connection_id: process.env.NEXT_PUBLIC_KINDE_AUTH_PASSWORDLESS || "",
          login_hint: email,
        }}
      >
        <div
          className={cn(
            "flex items-center justify-center mb-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
            { "opacity-50 cursor-not-allowed": !isEmailValid },
          )}
          onClick={!isEmailValid ? (e) => e.preventDefault() : undefined}
        >
          Sign in &rarr;
          <BottomGradient />
        </div>
      </LoginLink>
      {!isEmailValid && email.includes("@") && (
        <>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <MovingBorderContainer borderRadius="0.5rem" className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
            <div className="p-4 text-center">
              <p className="lg:text-[16px]">Ooops! That email isn't in my list, loves! Self-sign up is also disabled. Sorry!</p>
            </div>
          </MovingBorderContainer>
        </>
      )}
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
