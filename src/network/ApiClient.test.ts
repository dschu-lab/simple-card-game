import { Card } from "../models/Card";
import { ApiClient } from "./ApiClient";

describe("ApiClient", () => {
  let client: ApiClient;

  beforeEach(() => {
    client = new ApiClient();
  });

  it("fetches cards", async () => {
    const cards = await client.getCards();
    expect(Array.isArray(cards)).toBeTruthy();
  });

  it("updates a card", async () => {
    const card = new Card("TEST", "Unit Test", "Bot", 1);
    const respondedCard = await client.updateCard(card.id, card);

    expect(respondedCard.id).toBe(card.id);
    expect(respondedCard.playerName).toBe(card.playerName);
    expect(respondedCard.realName).toBe(card.realName);
    expect(respondedCard.assetId).toBe(card.assetId);
  });
});
