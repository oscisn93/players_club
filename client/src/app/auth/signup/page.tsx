"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the signup data to your backend
    console.log("Signup submitted:", formData);
    // Reset form after submission
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md rounded-lg bg-zinc-800 p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-emerald-400">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
