import { plainToInstance } from "class-transformer";
import React, { createContext, useState } from "react";
import { ToastMessageType, ToastMessage } from "../models/ToastMessage";

interface ToastMessageContextState {
  messages: ToastMessage[];
  addMessage: (
    title: string,
    description: string,
    type: ToastMessageType
  ) => void;
  removeMessage: (idToRemove: string) => void;
}

const defaultState: ToastMessageContextState = {
  messages: [],
  addMessage: (
    title: string,
    description: string,
    type: ToastMessageType
  ) => {},
  removeMessage: (idToRemove: string) => {},
};

export const ToastMessageContext =
  createContext<ToastMessageContextState>(defaultState);

export const ToastMessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addMessage = (
    title: string,
    description: string,
    type: ToastMessageType
  ) =>
    setMessages((messages) => [
      ...messages,
      plainToInstance(ToastMessage, { title, description, type }),
    ]);

  const removeMessage = (idToRemove: string) =>
    setMessages((messages) =>
      messages.filter((message) => message.id !== idToRemove)
    );

  return (
    <ToastMessageContext.Provider
      value={{ messages, addMessage, removeMessage }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
};
