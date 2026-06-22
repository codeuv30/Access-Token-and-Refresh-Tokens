"use client";

import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;