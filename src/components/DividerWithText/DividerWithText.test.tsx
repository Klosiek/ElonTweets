import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import DividerWithText from "./DividerWithText";

it("Should render with no errors", () => {
  render(<DividerWithText />);
});
