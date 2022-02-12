import { assets } from "../data/assetData";

interface ICard {
  id: string;
  realName: string;
  playerName: string;
  assetId: number;
}

export class Card implements ICard {
  id: string;
  realName: string;
  playerName: string;
  assetId: number;

  get asset() {
    return assets.find((asset) => asset.id === this.assetId);
  }

  constructor(
    id: string,
    realName: string,
    playerName: string,
    assetId: number
  ) {
    this.id = id;
    this.realName = realName;
    this.playerName = playerName;
    this.assetId = assetId;
  }
}

export interface CardsDto {
  data: {
    cards: ICard[];
  };
}

export interface CardDto {
  data: {
    card: ICard;
  };
}
