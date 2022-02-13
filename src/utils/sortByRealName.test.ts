import { Card } from "../models/Card";
import { sortByRealName } from "./sortByRealName";

describe("sortByRealName", () => {
  let cards: Card[];

  beforeEach(() => {
    cards = [
      new Card("2", "B", "Player", 1),
      new Card("1", "A", "Player", 1),
      new Card("3", "C", "Player", 1),
    ];
  });

  it("sort cards ascending (by real name)", () => {
    const sortedCards = [...cards].sort(sortByRealName("asc"));
    expect(sortedCards[0].id).toBe("1");
  });

  it("sort cards descending (by real name)", () => {
    const sortedCards = [...cards].sort(sortByRealName("desc"));
    expect(sortedCards[0].id).toBe("3");
  });
});
