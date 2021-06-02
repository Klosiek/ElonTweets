import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#f7fafc", "#1A202C")(props),
      },
    }),
  },
  colors: {
    panelDark: "#2D3748",
    panelLight: "#FFFFFF",
    secondaryTextDark: "#A0AEC0",
    secondaryTextLight: "",
    primary: "#63B3ED",
    secondary: "#D65DB1",
    bgPrimary: "#1A202C",
    bgSecondary: "#2D3748",
    highlight: "#00C9A7",
    warning: "#C34A36",
  },
});
