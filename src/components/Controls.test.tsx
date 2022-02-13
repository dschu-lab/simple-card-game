import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { AppContext, AppContextState, SortOrder } from "../contexts/AppContext";
import { Card } from "../models/Card";
import { theme } from "../style/theme";
import { Controls } from "./Controls";

describe("Controls", () => {
  let cards: Card[];
  let appContext: AppContextState;
  let submitSelectedCard: jest.Mock;
  let order: SortOrder;
  let setOrder: jest.Mock;
  let setSelectedCardId: jest.Mock;

  beforeEach(() => {
    cards = [new Card("1", "John", "Doe", 1)];
    submitSelectedCard = jest.fn();
    order = "none";
    setOrder = jest.fn((newOrder: SortOrder) => (order = newOrder));
    setSelectedCardId = jest.fn();

    appContext = {
      cards,
      order,
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

  it("renders controls", () => {
    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Controls />
        </AppContext.Provider>
      </ThemeProvider>
    );
    const sortAsc = screen.getByText(/Sort Asc/i);
    const sortDesc = screen.getByText(/Sort Desc/i);
    const submitButton = screen.getByText(/Submit/i);

    expect(sortAsc).toBeInTheDocument();
    expect(sortDesc).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("reacts on click on sort asc", () => {
    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Controls />
        </AppContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/Sort Asc/));
    expect(order).toBe("asc");
    expect(setOrder).toHaveBeenCalledTimes(1);
  });

  it("reacts on click on sort desc", () => {
    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Controls />
        </AppContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/Sort Desc/));
    expect(order).toBe("desc");
    expect(setOrder).toHaveBeenCalledTimes(1);
  });

  it("reacts on click on submit", () => {
    appContext.selectedCardId = cards[0].id;

    render(
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContext}>
          <Controls />
        </AppContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/Submit/));
    expect(submitSelectedCard).toHaveBeenCalledTimes(1);
  });
});
