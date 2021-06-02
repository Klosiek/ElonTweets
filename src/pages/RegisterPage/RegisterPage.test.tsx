import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import RegisterPage from "./RegisterPage";

it("Should render with no errors", () => {
  render(<RegisterPage />);
});
