import { theme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom/extend-expect";
import FirebaseProvider from "providers/FirebaseProvider";
import { render } from "test-utils";
import ForgotPassword from "./ForgotPassword";

it("Should render with no errors", () => {
  render(
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <ForgotPassword />
      </FirebaseProvider>
    </ChakraProvider>
  );
});
