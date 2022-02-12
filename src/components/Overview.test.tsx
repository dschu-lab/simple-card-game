import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { AppContext, AppContextState } from "../contexts/AppContext";
import { Card } from "../models/Card";
import { theme } from "../style/theme";
import { Overview } from "./Overview";

describe("Overview", () => {
  let appContext: AppContextState;
  let setSelectedCardId: jest.Mock;

  beforeEach(() => {
    const cards = [new Card("1", "John", "Doe", 1)];
    const setOrder = jest.fn();
    const submitSelectedCard = jest.fn();
    setSelectedCardId = jest.fn();

    appContext = {
      cards,
      order: "none",
      setOrder,
      selectedCardId: null,
      setSelectedCardId,
      submitSelectedCard,
      requests: {
        fetching: {
          errorMessage: "",
          hasErrored: false,
          isActive: false,
        },
        updating: {
          errorMessage: "",
          hasErrored: false,
          isActive: false,
        },
      },
    };
  });

  it("renders card", () => {
    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Overview />
        </AppContext.Provider>
      </ThemeProvider>
    );
    const detailsElement = screen.getByText(/John/i);
    expect(detailsElement).toBeInTheDocument();
  });

  it("reacts on click on card", () => {
    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Overview />
        </AppContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/John/));
    expect(setSelectedCardId).toHaveBeenCalledTimes(1);
  });
});
