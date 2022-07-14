import { Card as CardType } from "../../types";
import Card from "../Card/Card";

type Props = { cards: CardType[]; onPress: () => void };

const CardStack = ({ cards, onPress }: Props) => {
  return <Card card={cards?.[0]} onPress={onPress} />;
};

export default CardStack;
