"use client";
import WritePage from "@/features/write";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Write = () => {
  const session = useSession();

  if (!session) return redirect("/login");
  return <WritePage />;
};

export default Write;
