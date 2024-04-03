import { Suit } from "../../Card.types";

/**
 *
 */
export default (suit: Suit) => {
  switch (suit) {
    case Suit.CLUBS:
      return "cards-club";
    case Suit.SPADES:
      return "cards-spade";
    case Suit.HEARTS:
      return "cards-heart";
    case Suit.DIAMONDS:
    default:
      return "cards-diamond";
  }
};
