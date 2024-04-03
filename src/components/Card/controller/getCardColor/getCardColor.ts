import { Suit } from "../../Card.types";

/**
 *
 */
export default (suit: Suit) => {
  switch (suit) {
    case Suit.CLUBS:
    case Suit.SPADES:
      return "black";
    case Suit.HEARTS:
    case Suit.DIAMONDS:
    default:
      return "red";
  }
};
