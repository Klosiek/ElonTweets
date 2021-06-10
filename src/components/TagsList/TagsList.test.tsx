import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import TagsList from "./TagsList";

it("Should render with no errors", () => {
  render(<TagsList />);
});
