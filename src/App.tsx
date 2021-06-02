import { useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import firebase from "firebase";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { theme } from "./shared/styles/theme";
import "firebase/auth";
import "firebase/firestore";
import FirebaseProvider from "providers/FirebaseProvider";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </FirebaseProvider>
    </ChakraProvider>
  );
};
