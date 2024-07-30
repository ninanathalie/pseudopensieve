import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, NotebookPen, Sun, FilePlus2, LogIn, LogOut } from "lucide-react";

export default function Header() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-5 w-5" />,
      requiresAuth: false,
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <NotebookPen className="h-5 w-5" />,
      requiresAuth: false,
    },
    {
      name: "Write",
      link: "/new-blog",
      icon: <FilePlus2 className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "LogIn",
      link: "/login",
      icon: <LogIn className="h-5 w-5" />,
      requiresAuth: false,
    },
    {
      name: "LogOut",
      link: "",
      icon: <LogOut className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      name: "Light",
      link: "/",
      icon: <Sun className="h-5 w-5" />,
      requiresAuth: false,
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
