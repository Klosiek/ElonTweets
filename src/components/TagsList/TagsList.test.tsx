import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom/extend-expect";
import FirebaseProvider from "providers/FirebaseProvider";
import { render } from "test-utils";
import TagsList from "./TagsList";

it("Should render with no errors", () => {
  render(
    <ChakraProvider>
      <FirebaseProvider>
        <TagsList />
      </FirebaseProvider>
    </ChakraProvider>
  );
});
