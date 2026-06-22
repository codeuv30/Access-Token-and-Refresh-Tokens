"use client";

import { useAuth } from "@/context/authContext";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { hydrateUser, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", formData);

      hydrateUser();

      router.push("/home");
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 bg-background"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
