import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Card, CardType } from "../../../components";
import { useEffect, useState } from "react";
import { getInitialDeck, shuffleDeck } from "../../../controller";
import { Guess, Pile } from "./Nines.types";
import { Button, ProgressBar, ToggleButton, Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  progressContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
  },
});

const Nines = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState<Pile[]>([]);
  const [guess, setGuess] = useState<Guess>(Guess.SAME);

  const reset = () => {
    const [one, two, three, four, five, six, seven, eight, nine, ...rest] =
      shuffleDeck(getInitialDeck());
    setDeck(rest);
    setGameState([
      { flipped: false, cards: [one] },
      { flipped: false, cards: [two] },
      { flipped: false, cards: [three] },
      { flipped: false, cards: [four] },
      { flipped: false, cards: [five] },
      { flipped: false, cards: [six] },
      { flipped: false, cards: [seven] },
      { flipped: false, cards: [eight] },
      { flipped: false, cards: [nine] },
    ]);
  };

  useEffect(reset, []);

  const flipNextCardOnStack = (index: number) => () => {
    if (gameState[index].flipped) return;
    if (deck.length) {
      const [card, ...rest] = deck;

      setDeck(rest);
      setGameState((prev) => [
        ...prev.slice(0, index),
        {
          ...prev[index],
          cards: [card, ...prev[index].cards],
          flipped:
            (guess === Guess.LOW &&
              card.card > gameState[index].cards[0].card) ||
            (guess === Guess.HIGH &&
              card.card < gameState[index].cards[0].card) ||
            (guess === Guess.SAME &&
              card.card !== gameState[index].cards[0].card),
        },
        ...prev.slice(index + 1),
      ]);
    }
  };

  const lost = gameState.length && gameState.every(({ flipped }) => flipped);

  if (lost) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Game Over</Text>
        <Text>
          You had {deck.length} card{deck.length > 1 ? "s" : ""} remaining
        </Text>
        <Button onPress={reset}>RESET</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={gameState}
        style={{ width: "95%" }}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Card
            card={item.cards[0]}
            onPress={flipNextCardOnStack(index)}
            back={item.flipped}
          />
        )}
        ListHeaderComponent={
          <View style={styles.progressContainer}>
            <ProgressBar progress={(43 - deck.length) / 43} />
          </View>
        }
      />

      {!deck.length && <Text>Winner!!</Text>}
      {/* @ts-expect-error Bad RNPaper types */}
      <ToggleButton.Row onValueChange={setGuess} value={guess}>
        {/* @ts-expect-error Bad RNPaper types */}
        <ToggleButton icon="minus" value={Guess.LOW} />
        {/* @ts-expect-error Bad RNPaper types */}
        <ToggleButton icon="equal" value={Guess.SAME} />
        {/* @ts-expect-error Bad RNPaper types */}
        <ToggleButton icon="plus" value={Guess.HIGH} />
      </ToggleButton.Row>

      {/* <Card card={{ suit: "Hearts", card: 1 }} /> */}
    </SafeAreaView>
  );
};

export default Nines;
