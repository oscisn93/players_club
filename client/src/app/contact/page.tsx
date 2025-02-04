"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-emerald-400">Contact Us</h1>
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-zinc-700 bg-zinc-800 text-emerald-100"
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
              className="w-full border-zinc-700 bg-zinc-800 text-emerald-100"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-emerald-200"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border-zinc-700 bg-zinc-800 text-emerald-100"
              rows={5}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-500 text-zinc-900 hover:bg-emerald-600"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
