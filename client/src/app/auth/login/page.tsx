"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { mockUsers } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md rounded-lg bg-zinc-800 p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-emerald-400">
          Log In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
          >
            Log In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-emerald-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
