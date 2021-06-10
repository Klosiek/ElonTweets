import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import Intro from "./Intro";

it("Should render with no errors", () => {
  render(<Intro />);
});
