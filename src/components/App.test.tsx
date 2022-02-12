import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders without error in loading state", async () => {
  await render(<App />);
  const detailsElement = screen.getByText(/Loading/i);
  expect(detailsElement).toBeInTheDocument();
});
