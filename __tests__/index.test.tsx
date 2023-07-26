/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Home from "../pages";

describe("General Page Render", () => {
  render(<Home />);
  test("renders drag and drop box", () => {
    const dropBox = screen.getByText(/drag your files here/i);
    expect(dropBox).toBeInTheDocument();
  });
});
