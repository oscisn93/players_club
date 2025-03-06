"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React
import { User } from "better-auth/types";
import auth from "@/lib/auth/client";
import { UserWithAnonymous } from "better-auth/plugins/anonymous";
import { X } from "lucide-react";

// TODO: implement a file upload api so users can store profile images
export default function ProfilePage() {
  const [pending, setPending] = useState<boolean>(false);
  const [user, setUser] = useState<User | UserWithAnonymous | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = auth.useSession();
    if (session.isPending) {
      setPending(true);
    }
    if (session.data) {
      setPending(false);
      setUser(session.data.user);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) =>
      prevState ? { ...prevState, [name]: value } : null,
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsEditing(false);
    }
  };

  if (pending) {
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
              value={user!.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-zinc-600 bg-zinc-700 text-emerald-100"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image (optional)</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex w-full items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <Button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await auth.updateUser({
                  name: user!.name,
                  image: imageURL ? imageURL : user!.image,
                });
              }}
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
