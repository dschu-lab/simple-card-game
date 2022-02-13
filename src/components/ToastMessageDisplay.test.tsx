import { fireEvent, render, screen } from "@testing-library/react";
import { plainToInstance } from "class-transformer";
import { ThemeProvider } from "styled-components";
import {
  ToastMessageContext,
  ToastMessageContextState,
} from "../contexts/ToastMessageContext";
import { ToastMessage, ToastMessageType } from "../models/ToastMessage";
import { theme } from "../style/theme";
import { ToastMessageDisplay } from "./ToastMessageDisplay";

describe("ToastMessageDisplay", () => {
  let messages: ToastMessage[];
  let messageContext: ToastMessageContextState;
  let addMessage: jest.Mock;
  let removeMessage: jest.Mock;

  beforeEach(() => {
    messages = [
      plainToInstance(ToastMessage, {
        title: "Unit Test",
        description: "Test Description",
        type: "error",
      }),
    ];
    addMessage = jest.fn(
      (title: string, description: string, type: ToastMessageType) => {
        messages.push(
          ...messages,
          plainToInstance(ToastMessage, { title, description, type })
        );
      }
    );

    removeMessage = jest.fn((idToRemove: string) => {
      messages = messages.filter((message) => message.id !== idToRemove);
    });

    messageContext = {
      messages,
      addMessage,
      removeMessage,
    };
  });

  it("renders toast message", () => {
    render(
      <ThemeProvider theme={theme}>
        <ToastMessageContext.Provider value={messageContext}>
          <ToastMessageDisplay />
        </ToastMessageContext.Provider>
      </ThemeProvider>
    );
    const title = screen.getByText(/Unit Test/i);
    const description = screen.getByText(/Test Description/i);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("closes message", () => {
    render(
      <ThemeProvider theme={theme}>
        <ToastMessageContext.Provider value={messageContext}>
          <ToastMessageDisplay />
        </ToastMessageContext.Provider>
      </ThemeProvider>
    );

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(removeMessage).toHaveBeenCalledTimes(1);
    expect(messages.length).toBe(0);
  });
});
