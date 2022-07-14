import { Card, Number, Suit } from "../types";

export default (): Card[] => {
  const suits = Object.values(Suit);
  const cards: Card[] = [];
  suits.forEach((suit) =>
    cards.push(
      ...[
        { suit, number: Number.Ace },
        { suit, number: Number.Two },
        { suit, number: Number.Three },
        { suit, number: Number.Four },
        { suit, number: Number.Five },
        { suit, number: Number.Six },
        { suit, number: Number.Seven },
        { suit, number: Number.Eight },
        { suit, number: Number.Nine },
        { suit, number: Number.Ten },
        { suit, number: Number.Jack },
        { suit, number: Number.Queen },
        { suit, number: Number.King },
      ]
    )
  );

  return cards;
};
