import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import SetsList from "./SetsList";

it("Should render with no errors", () => {
  render(<SetsList />);
});
