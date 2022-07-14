import { Suit } from "../types";

export default (suit: Suit): string => {
  switch (suit) {
    case Suit.Hearts:
    case Suit.Diamonds:
      return "red";
    case Suit.Clubs:
    case Suit.Spades:
      return "black";
    default:
      return "blue";
  }
};
