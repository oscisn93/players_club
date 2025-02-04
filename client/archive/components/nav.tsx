"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Box, Tabs } from "@chakra-ui/react";
import { TbCards } from "react-icons/tb";

import { TabsList } from "@/lib/constants.ts";

export default function Nav() {
  const router = useRouter();

  return (
    <Tabs.Root defaultValue="home" variant="enclosed" width="full">
      <Tabs.List width="full">
        <Tabs.Trigger
          key="logo"
          width={`1/${TabsList.length + 1}`}
          onClick={() => router.push("/")}
        >
          <TbCards />
          Telefunken
        </Tabs.Trigger>
        {TabsList.map(function ({ name, displayName, icon, content }) {
          return (
            <Tabs.Trigger
              key={name}
              value={name}
              layerStyle="fill.subtle"
              width={`1/${TabsList.length + 1}`}
            >
              {icon()} {displayName}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}
