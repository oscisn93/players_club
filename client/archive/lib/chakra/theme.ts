import {
  defineTextStyles,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

import { THEME_COLORS } from "@/constants";

const textStyles = defineTextStyles({
  josefinSansFont: {
    description:
      "The text style for the game name - used whenever the word 'Telefunken' is used in the UI",
    value: {
      fontFamily: "Josefin sans",
      fontWeight: "black",
      lineHeight: "shorter",
      letterSpacing: "tighter",
    },
  },
});

const config = defineConfig({
  theme: {
    textStyles,
    tokens: {
      colors: {
        primary: {
          value: THEME_COLORS.EMERALD,
        },
        primaryComplement: {
          value: THEME_COLORS.EMERALD_LIGHT,
        },
        secondary: {
          value: THEME_COLORS.RED,
        },
        contrast: {
          value: THEME_COLORS.SLATE_WHITE,
        },
        black: {
          value: THEME_COLORS.DARK_ZINC,
        },
      },
    },
  },
  cssVarsRoot: ":where(:root, :host)",
  globalCss: {
    html: {
      margin: 0,
      padding: 0,
      color: THEME_COLORS.SLATE_WHITE,
      background: THEME_COLORS.EMERALD,
      fontFamily: ["Monospace"],
    },
  },
});

export default createSystem(defaultConfig, config);
