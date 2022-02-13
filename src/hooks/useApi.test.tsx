import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { Card } from "../models/Card";
import { ApiClient } from "../network/ApiClient";
import { useApi } from "./useApi";

jest.mock("../network/ApiClient");

describe("useApi", () => {
  let updateCardMock: jest.Mock;

  beforeEach(() => {
    (ApiClient as jest.Mock).mockClear();

    (ApiClient.prototype.getCards as jest.Mock).mockReturnValue([
      new Card("TEST-1", "John", "Doe", 1),
      new Card("TEST-2", "Max", "Doe", 2),
    ]);

    updateCardMock = jest.fn((id: string, card: Partial<Card>) => {
      return card;
    });
    (ApiClient.prototype.updateCard as jest.Mock) = updateCardMock;
  });

  it("should fetch cards", async () => {
    const selectedCardId = null;
    const { result } = renderHook(() => useApi({ selectedCardId }));

    await waitFor(async () => {
      expect(result.current.fetchingState.isActive).toBeFalsy();
    });

    expect(result.current.cards.length).toBe(2);
  });

  it("should update a card", async () => {
    const { result } = renderHook(() => useApi({ selectedCardId: "TEST-2" }));

    await waitFor(async () => {
      expect(result.current.fetchingState.isActive).toBeFalsy();
    });

    act(() => {
      result.current.submitSelectedCard();
    });

    await waitFor(async () => {
      expect(result.current.updatingState.isActive).toBeFalsy();
    });

    expect(updateCardMock).toHaveBeenCalledTimes(1);
  });
});
