import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import LoginPage from "./LoginPage";

it("Should render with no errors", () => {
  render(<LoginPage />);
});
