"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import auth from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  return (
    <Card className="mx-auto max-w-md rounded-lg border border-emerald-600 bg-gradient-to-br from-slate-900 from-5% via-slate-950 via-40% to-zinc-950 to-90% px-6 pt-2 text-emerald-400">
      <CardHeader>
        <CardTitle className="mb-6 text-center text-3xl font-bold text-emerald-400">
          Sign Up
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="Max"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Robinson"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm Password"
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
          <Button
            type="submit"
            className="w-full border border-emerald-300 bg-emerald-500 text-zinc-950 hover:bg-slate-900 hover:font-extrabold hover:text-emerald-400"
            disabled={loading}
            onClick={async (e) => {
              e.preventDefault();
              await auth.signUp.email({
                email,
                password,
                name: `${firstName} ${lastName}`,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/",
                fetchOptions: {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onRequest: () => {
                    setLoading(true);
                  },
                  onError: (ctx) => {
                    toast.error(ctx.error.message);
                  },
                  onSuccess: async () => {
                    router.push("/");
                  },
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
          <Button
            type="submit"
            className="w-full border border-zinc-500 bg-zinc-200 text-zinc-950 hover:border-zinc-100 hover:bg-slate-900 hover:text-zinc-200"
            disabled={loading}
            onClick={async () => {
              const user = await auth.signInAnonymously();
              if (!user) {
                toast.error("Something went wrong, please try again later...");
              } else {
                router.push("/");
              }
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Login Anonymously"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
        <div className="flex w-full justify-center border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by{" "}
            <span className="font-extrabold text-emerald-400">
              better-auth.
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

// TODO: implement image upload API
async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
