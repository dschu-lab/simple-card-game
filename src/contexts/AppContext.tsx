import { createContext, useCallback, useState } from "react";
import { Card } from "../models/Card";
import { RequestState, defaultRequestState } from "../models/RequestState";
import { useApi } from "../hooks/useApi";

/**
 * Sort order of the list
 */
export type SortOrder = "none" | "asc" | "desc";

/**
 * App context interface
 */
export interface AppContextState {
  cards: Card[];
  order: SortOrder;
  setOrder: (order: SortOrder) => void;
  selectedCardId: string | null;
  setSelectedCardId: (index: string | null) => void;
  submitSelectedCard: () => void;
  requests: {
    fetching: RequestState;
    updating: RequestState;
  };
}

const defaultState: AppContextState = {
  cards: [],
  order: "none",
  setOrder: (order: SortOrder) => {},
  selectedCardId: null,
  setSelectedCardId: (index: string | null) => {},
  submitSelectedCard: () => {},
  requests: {
    fetching: defaultRequestState,
    updating: defaultRequestState,
  },
};

export const AppContext = createContext<AppContextState>(defaultState);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [order, setOrder] = useState<SortOrder>("none");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const { cards, fetchingState, updatingState, updateCard } = useApi();

  const submitSelectedCard = useCallback(() => {
    const card = cards.find((card) => card.id === selectedCardId);

    if (selectedCardId && card) {
      updateCard(selectedCardId, card);
    }
  }, [cards, selectedCardId, updateCard]);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          cards,
          order,
          setOrder,
          selectedCardId,
          setSelectedCardId,
          submitSelectedCard,
          requests: {
            fetching: fetchingState,
            updating: updatingState,
          },
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};
