import { Suit } from "../types";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export default (
  suit: Suit
): ComponentProps<typeof MaterialCommunityIcons>["name"] => {
  switch (suit) {
    case Suit.Hearts:
      return "cards-heart";
    case Suit.Clubs:
      return "cards-club";
    case Suit.Diamonds:
      return "cards-diamond";
    case Suit.Spades:
      return "cards-spade";
    default:
      return "head-question";
  }
};
