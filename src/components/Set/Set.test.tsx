import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom/extend-expect";
import { theme } from "shared/styles/theme";
import { render } from "test-utils";
import Set from "./Set";
import SetMock from "./Set.mock";

it("Should render with no errors", () => {
  render(
    <ChakraProvider theme={theme}>
      <Set {...SetMock} />
    </ChakraProvider>
  );
});
