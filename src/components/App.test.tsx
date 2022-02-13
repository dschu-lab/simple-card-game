import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Card } from "../models/Card";
import { ApiClient } from "../network/ApiClient";
import App from "./App";

jest.mock("../network/ApiClient");

describe("App", () => {
  beforeEach(() => {
    (ApiClient as jest.Mock).mockClear();

    (ApiClient.prototype.getCards as jest.Mock).mockReturnValue([
      new Card("1", "John", "Doe", 1),
      new Card("2", "Max", "Doe", 2),
    ]);
  });

  it("renders without error", async () => {
    render(<App />);

    await waitFor(async () => {
      await waitForElementToBeRemoved(() => screen.queryByText("LOADING"));
    });

    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Max/)).toBeInTheDocument();
  });
});
