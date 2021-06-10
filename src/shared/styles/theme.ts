import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#F7FAFC", "#1A202C")(props),
        minH: "100vh",
      },
    }),
  },
  colors: {
    panelDark: "#2D3748",
    panelSecondaryDark: "#171923",
    panelLight: "#FFFFFF",
    panelSecondaryLight: "#F7FAFC",
    secondaryText: "#A0AEC0",
    primary: "#63B3ED",
    secondary: "#D65DB1",
    bgPrimary: "#1A202C",
    bgSecondary: "#2D3748",
    highlight: "#00C9A7",
    warning: "#C34A36",
  },
});
