"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React
import { User } from "better-auth/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) =>
      prevState ? { ...prevState, [name]: value } : null,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsEditing(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg bg-zinc-800 p-8">
        <h1 className="mb-6 text-3xl font-bold text-emerald-400">
          Your Profile
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
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
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
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
          {/* <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-emerald-200">
                Games Played
              </label>
              <p className="text-slate-300">{user.gamesPlayed}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-emerald-200">
                Wins
              </label>
              <p className="text-slate-300">{user.wins}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-emerald-200">
                Losses
              </label>
              <p className="text-slate-300">{user.losses}</p>
            </div>
          </div> */}
          {isEditing ? (
            <Button
              type="submit"
              className="bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
            >
              Edit Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
