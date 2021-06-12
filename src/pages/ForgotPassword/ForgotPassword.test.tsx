import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import ForgotPassword from "./ForgotPassword";

it("Should render with no errors", () => {
  render(<ForgotPassword />);
});
