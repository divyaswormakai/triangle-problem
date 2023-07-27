/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import DataInTriangle from "../data-in-triangle";

const triangleData = [[50], [9, 6], [4, 6, 8], [0, 7, 1, 5], [8, 3, 1, 1, 2]];
const maxRouteValue = {
  path: [0, 0, 1, 1, 1],
  maxTotal: 75,
};

describe("Data In Triangle", () => {
  let scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  render(
    <DataInTriangle
      triangleData={triangleData}
      maxRouteValue={maxRouteValue}
    />,
  );

  const activeElement = screen.getByText(/50/i);
  const inactiveElement = screen.getByText(/2/i);

  test("triangle is rendered", () => {
    expect(activeElement.id).toEqual("box-0-0");
  });
  test("triangle is with correct flow", async () => {
    jest.setTimeout(5 * 1000);
    expect(activeElement.className).toContain("text-white");
  });
  test("triangle is with correct flow 2", () => {
    expect(inactiveElement.className).not.toContain("text-white");
  });
});
