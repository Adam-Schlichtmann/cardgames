export enum Suit {
  HEARTS = "Hearts",
  DIAMONDS = "Diamonds",
  CLUBS = "Clubs",
  SPADES = "Spades",
}

export enum CardNumber {
  ACE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
}

export type Card = {
  suit: Suit;
  card: CardNumber;
};

export type Props = {
  card: Card;
  onPress?: (card: Card) => void;
  back?: boolean;
};
