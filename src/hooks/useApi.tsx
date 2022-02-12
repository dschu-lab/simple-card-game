import { plainToInstance } from "class-transformer";
import { useContext, useEffect, useMemo, useState } from "react";
import { Card } from "../models/Card";
import { ApiClient } from "../network/ApiClient";
import { RequestState, defaultRequestState } from "../models/RequestState";
import { ToastMessageContext } from "../contexts/ToastMessageContext";

export const useApi = ({
  selectedCardId,
}: {
  selectedCardId: string | null;
}) => {
  const apiClient = useMemo(() => new ApiClient(), []);

  const [cards, setCards] = useState<Card[]>([]);

  const [didInitialFetch, setInitialFetch] = useState<boolean>(false);
  const [fetchingState, setFetchingState] =
    useState<RequestState>(defaultRequestState);
  const [updatingState, setUpdatingState] =
    useState<RequestState>(defaultRequestState);

  const { addMessage } = useContext(ToastMessageContext);

  const submitSelectedCard = async () => {
    if (updatingState.isActive) {
      return;
    }

    const card = cards.find((card) => card.id === selectedCardId);
    if (card) {
      try {
        // Set update flag
        setUpdatingState((state) => ({ ...state, isActive: true }));

        // Send data to api
        await apiClient.updateCard(card.id, card);

        // Update the flags
        setUpdatingState({
          isActive: false,
          hasErrored: false,
          errorMessage: "",
        });

        // Create toast notification
        addMessage("Good work", "Player card has been updated!", "success");
      } catch (e) {
        let errorMessage = "";
        if (e instanceof Error) {
          errorMessage = e.message;
        }

        // Update the flags
        setUpdatingState({
          isActive: false,
          hasErrored: true,
          errorMessage,
        });

        // Create toast notification
        addMessage("Uh oh", errorMessage, "error");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Skip fetching if fetched once, already fetching or fetching errored
      if (
        didInitialFetch ||
        fetchingState.isActive ||
        fetchingState.hasErrored
      ) {
        return;
      }

      try {
        // Set update flag
        setFetchingState((state) => ({ ...state, isActive: true }));

        // Retrieve data from the api
        const data: Card[] = await apiClient.getCards();

        // Set cards
        setCards(plainToInstance(Card, data));

        // Update fetching state
        setFetchingState({
          isActive: false,
          hasErrored: false,
          errorMessage: "",
        });
        setInitialFetch(true);
      } catch (e) {
        let errorMessage = "";
        if (e instanceof Error) {
          errorMessage = e.message;
        }

        setFetchingState({
          isActive: false,
          hasErrored: true,
          errorMessage,
        });
      }
    };
    fetchData();
  }, [
    apiClient,
    fetchingState.isActive,
    didInitialFetch,
    fetchingState.hasErrored,
  ]);

  return { cards, fetchingState, updatingState, submitSelectedCard };
};
