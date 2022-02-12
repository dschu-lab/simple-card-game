import { instanceToPlain, plainToInstance } from "class-transformer";
import { Card, CardDto, CardsDto } from "../models/Card";

/**
 * Simple API client using the fetch api
 */
export class ApiClient {
  private readonly baseURL = "https://simple-card-game.free.mockoapp.net";

  /**
   * Fetches all cards from the backend
   *
   * @returns Array of cards
   */
  public async getCards(): Promise<Card[]> {
    const { data } = await fetch(`${this.baseURL}/cards/`)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((response) => response.json() as Promise<CardsDto>);

    return plainToInstance(Card, data.cards);
  }

  /**
   * Updates a card
   *
   * @param cardId Identifier of the card to update
   * @param card Partial card data to update
   * @returns Updated card
   */
  public async updateCard(cardId: string, card: Partial<Card>): Promise<Card> {
    const { data } = await fetch(`${this.baseURL}/cards/${cardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instanceToPlain(card)),
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((response) => response.json() as Promise<CardDto>);

    return plainToInstance(Card, data.card);
  }
}
