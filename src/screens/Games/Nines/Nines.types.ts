import { CardType } from "../../../components";

export type Pile = {
  flipped: boolean;
  cards: CardType[];
};

export enum Guess {
  HIGH,
  LOW,
  SAME,
}
