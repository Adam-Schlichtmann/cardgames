import { CardNumber } from "../../Card.types";

/**
 *
 */
export default (card: CardNumber) => {
  switch (card) {
    case CardNumber.ACE:
      return "A";
    case CardNumber.TWO:
      return "2";
    case CardNumber.THREE:
      return "3";
    case CardNumber.FOUR:
      return "4";
    case CardNumber.FIVE:
      return "5";
    case CardNumber.SIX:
      return "6";
    case CardNumber.SEVEN:
      return "7";
    case CardNumber.EIGHT:
      return "8";
    case CardNumber.NINE:
      return "9";
    case CardNumber.TEN:
      return "10";
    case CardNumber.JACK:
      return "J";
    case CardNumber.QUEEN:
      return "Q";
    case CardNumber.KING:
      return "K";
    default:
      return "";
  }
};
