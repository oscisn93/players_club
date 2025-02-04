import {
  LuHouse,
  LuServer,
  LuCaptions,
  LuCircleUser,
  LuSettings,
} from "react-icons/lu";
import type { IconType } from "react-icons";

export type NavTab = {
  name: string;
  displayName: string;
  icon: IconType;
  route: string;
  content: string;
  active: boolean;
};

export const TabsList = [
  {
    name: "home",
    displayName: "Home",
    icon: LuHouse,
    route: "/",
    content: "This is the main page of your app",
    active: true,
  },
  {
    name: "games",
    displayName: "Games",
    icon: LuServer,
    route: "/games",
    content: "This is where your active game is, or where you can join a match",
    active: false,
  },
  {
    name: "scores",
    displayName: "Scores",
    icon: LuCaptions,
    route: "/user/scores",
    content: "This is where the history of all scores for a player",
    active: false,
  },
  {
    name: "profile",
    displayName: "Profile",
    icon: LuCircleUser,
    route: "/user/profile",
    content:
      "This is where users can manage their public profile and decide the content they want to share.",
    active: false,
  },
  {
    name: "settings",
    displayName: "Settings",
    icon: LuSettings,
    route: "/user/settings",
    content: "This is where users can change their settings",
    active: false,
  },
] satisfies NavTab[];

export const THEME_COLORS = {
  EMERALD: "#006045",
  EMERALD_LIGHT: "#00d492",
  SLATE_WHITE: "#f8fafc",
  DARK_ZINC: "#27272a",
  RED: "#a10000",
};
