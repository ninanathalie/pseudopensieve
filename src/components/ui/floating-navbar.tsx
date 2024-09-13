"use client";

import React from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: JSX.Element;
    requiresAuth?: boolean;
    useDiv?: boolean;
    useComponent?: boolean;
    component?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div
      className={cn(
        "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent rounded-2xl bg-white dark:bg-slate-950/90 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-5 py-2 items-center justify-center space-x-4",
        className,
      )}
    >
      {navItems.map((navItem, idx) => {
        const displayNav = navItem.name === "LogOut" ? isAuthenticated : navItem.name === "LogIn" ? !isAuthenticated : !navItem.requiresAuth || (navItem.requiresAuth && isAuthenticated);

        if (!displayNav) return null;

        return (
          <React.Fragment key={`nav-item-${idx}`}>
            {navItem.useComponent ? (
              navItem.component
            ) : navItem.useDiv ? (
              <div className="relative items-center flex px-2 py-3 hover:px-4 ease-in-out duration-300 group cursor-pointer">
                <span>{navItem.icon}</span>
                <span className={cn("absolute z-10 px-3 py-1 text-[0.6rem] tracking-wide uppercase text-white rounded-md shadow-sm bg-zinc-900", "hidden", "group-hover:inline-block")} style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                  {navItem.name}
                </span>
              </div>
            ) : (
              <Link href={navItem.link || "#"} className="relative items-center flex px-2 py-3 hover:px-4 ease-in-out duration-300 group">
                <span>{navItem.icon}</span>
                <span className={cn("absolute z-10 px-3 py-1 text-[0.6rem] tracking-wide uppercase text-white rounded-md shadow-sm bg-zinc-900", "hidden", "group-hover:inline-block")} style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                  {navItem.name}
                </span>
              </Link>
            )}

            {(navItem.name === "Blogs" || navItem.name === "LogOut" || navItem.name === "LogIn") && <div className="h-10 min-h-[1.4em] w-px self-stretch bg-zinc-200/90 dark:bg-zinc-200/10 m-auto"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
