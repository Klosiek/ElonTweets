import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import Navbar from "./Navbar";
// import NavbarMock from "./Navbar.mock";

it("Should render with no errors", () => {
  render(<Navbar />);
});
