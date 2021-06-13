import { ChakraProvider } from "@chakra-ui/react";
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
