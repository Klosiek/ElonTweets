import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import HomePage from "./HomePage";

it("Should render with no errors", () => {
  render(<HomePage />);
});
