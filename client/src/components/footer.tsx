import { Spade } from "lucide-react";
import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiX,
  type IconType,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Accordion, AccordionItem } from "./ui/accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";

type FooterListItem = {
  title: string;
  links: {
    destination: string;
    href: string;
    icon?: IconType;
  }[];
};

const footerLists = [
  {
    title: "Quick Links",
    links: [
      {
        destination: "Home",
        href: "/",
      },
      {
        destination: "About Us",
        href: "/about",
      },
      {
        destination: "Game Rules",
        href: "/rules",
      },
      {
        destination: "Contact Us",
        href: "/contact",
      },
    ],
  },
  {
    title: "Site Policies",
    links: [
      {
        destination: "Terms of Service",
        href: "/tos",
      },
      {
        destination: "Privacy",
        href: "/privacy",
      },
      {
        destination: "Cookies",
        href: "/cookies",
      },
      {
        destination: "User Conduct",
        href: "/conduct",
      },
    ],
  },
  {
    title: "Social Links",
    links: [
      {
        destination: "Twitter",
        href: "https://x.com",
        icon: <SiX className="text-emerald-400" size={16} />,
      },
      {
        destination: "Facebook",
        href: "https://facebook.com",
        icon: <SiFacebook className="text-emerald-400" size={16} />,
      },
      {
        destination: "Discord",
        href: "https://discord.com",
        icon: <SiDiscord className="text-emerald-400" size={16} />,
      },
      {
        destination: "Instagram",
        href: "https://instagram.com",
        icon: <SiInstagram className="text-emerald-400" size={16} />,
      },
    ],
  },
] as FooterListItem[];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-slate-950 min-h-[320px] pb-12 pt-4 text-zinc-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {footerLists.map((list) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={list.title}
            >
              <AccordionItem value={list.title}>
                <AccordionTrigger className="mb-4 text-lg font-bold text-emerald-300">
                  {list.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 mb-6">
                    {list.links.map((link) => (
                      <li key={link.destination}>
                        <a
                          href={link.href}
                          className="flex items-center gap-2 transition-colors hover:text-emerald-400"
                        >
                          {link.destination}
                          {link.icon ? link.icon : ""}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="mt-8 border-t border-zinc-700 pt-8 text-center">
          <p>
            &copy;2025
            <a
              href="https://github.com/oscisn93"
              target="_blank"
              className="font-semibold text-emerald-400"
            >
              {" Big O "}
            </a>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
