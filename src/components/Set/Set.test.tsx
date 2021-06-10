import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import Set from "./Set";
import SetMock from "./Set.mock";

it("Should render with no errors", () => {
  render(<Set {...SetMock} />);
});
