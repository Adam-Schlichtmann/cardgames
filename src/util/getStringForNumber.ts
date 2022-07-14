import { Number } from "../types";

export default (number: Number): string => {
  switch (number) {
    case Number.Ace:
      return "A";
    case Number.Two:
      return "2";
    case Number.Three:
      return "3";
    case Number.Four:
      return "4";
    case Number.Five:
      return "5";
    case Number.Six:
      return "6";
    case Number.Seven:
      return "7";
    case Number.Eight:
      return "8";
    case Number.Nine:
      return "9";
    case Number.Ten:
      return "10";
    case Number.Jack:
      return "J";
    case Number.Queen:
      return "Q";
    case Number.King:
      return "K";
    default:
      return "";
  }
};
