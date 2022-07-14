import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import CardStack from "../../components/CardStack";
import GameOverModal from "../../components/GameOverModal";
import compareCards from "../../util/compareCards";
import shuffle from "../../util/shuffle";
import { Card as CardType, Comparison, Locations } from "../../types";

const Nines = () => {
  const [guess, setGuess] = useState<Comparison>("HIGH");
  const [deck, setDeck] = useState<CardType[]>([]);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [topLeft, setTopLeft] = useState<CardType[]>([]);
  const [topMiddle, setTopMiddle] = useState<CardType[]>([]);
  const [topRight, setTopRight] = useState<CardType[]>([]);
  const [middleLeft, setMiddleLeft] = useState<CardType[]>([]);
  const [middleMiddle, setMiddleMiddle] = useState<CardType[]>([]);
  const [middleRight, setMiddleRight] = useState<CardType[]>([]);
  const [bottomLeft, setBottomLeft] = useState<CardType[]>([]);
  const [bottomMiddle, setBottomMiddle] = useState<CardType[]>([]);
  const [bottomRight, setBottomRight] = useState<CardType[]>([]);

  const setUp = useCallback(() => {
    const newDeck = shuffle();
    setTopLeft([newDeck.shift()!]);
    setTopMiddle([newDeck.shift()!]);
    setTopRight([newDeck.shift()!]);

    setMiddleLeft([newDeck.shift()!]);
    setMiddleMiddle([newDeck.shift()!]);
    setMiddleRight([newDeck.shift()!]);

    setBottomLeft([newDeck.shift()!]);
    setBottomMiddle([newDeck.shift()!]);
    setBottomRight([newDeck.shift()!]);

    setDeck(newDeck);
  }, []);

  useEffect(() => {
    setUp();
  }, [setUp]);

  const pressCard = useCallback(
    (location: Locations) => () => {
      const curDeck = [...deck];
      if (!curDeck.length) return;
      if (location === "topLeft") {
        const card = curDeck.shift()!;
        if (compareCards(card, topLeft[0], guess))
          setTopLeft([card, ...topLeft]);
        else setTopLeft([]);
      } else if (location === "topMiddle") {
        const card = curDeck.shift()!;
        if (compareCards(card, topMiddle[0], guess))
          setTopMiddle([card, ...topMiddle]);
        else setTopMiddle([]);
      } else if (location === "topRight") {
        const card = curDeck.shift()!;
        if (compareCards(card, topRight[0], guess))
          setTopRight([card, ...topRight]);
        else setTopRight([]);
      } else if (location === "middleLeft") {
        const card = curDeck.shift()!;
        if (compareCards(card, middleLeft[0], guess))
          setMiddleLeft([card, ...middleLeft]);
        else setMiddleLeft([]);
      } else if (location === "middleMiddle") {
        const card = curDeck.shift()!;
        if (compareCards(card, middleMiddle[0], guess))
          setMiddleMiddle([card, ...middleMiddle]);
        else setMiddleMiddle([]);
      } else if (location === "middleRight") {
        const card = curDeck.shift()!;
        if (compareCards(card, middleRight[0], guess))
          setMiddleRight([card, ...middleRight]);
        else setMiddleRight([]);
      } else if (location === "bottomLeft") {
        const card = curDeck.shift()!;
        if (compareCards(card, bottomLeft[0], guess))
          setBottomLeft([card, ...bottomLeft]);
        else setBottomLeft([]);
      } else if (location === "bottomMiddle") {
        const card = curDeck.shift()!;
        if (compareCards(card, bottomMiddle[0], guess))
          setBottomMiddle([card, ...bottomMiddle]);
        else setBottomMiddle([]);
      } else if (location === "bottomRight") {
        const card = curDeck.shift()!;
        if (compareCards(card, bottomRight[0], guess))
          setBottomRight([card, ...bottomRight]);
        else setBottomRight([]);
      }
      setDeck(curDeck);
    },

    [
      deck,
      topLeft,
      topMiddle,
      topRight,
      middleLeft,
      middleMiddle,
      middleRight,
      bottomLeft,
      bottomMiddle,
      bottomRight,
      guess,
    ]
  );

  useEffect(() => {
    if (
      deck.length === 0 ||
      (!topLeft.length &&
        !topMiddle.length &&
        !topRight.length &&
        !middleLeft.length &&
        !middleMiddle.length &&
        !middleRight.length &&
        !bottomLeft.length &&
        !bottomMiddle.length &&
        !bottomRight.length)
    ) {
      //setGameOverVisible(true);
    }
  }, [
    deck,
    topLeft,
    topMiddle,
    topRight,
    middleLeft,
    middleMiddle,
    middleRight,
    bottomLeft,
    bottomMiddle,
    bottomRight,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <CardStack cards={topLeft} onPress={pressCard("topLeft")} />
        <CardStack cards={topMiddle} onPress={pressCard("topMiddle")} />
        <CardStack cards={topRight} onPress={pressCard("topRight")} />
      </View>
      <View style={styles.row}>
        <CardStack cards={middleLeft} onPress={pressCard("middleLeft")} />
        <CardStack cards={middleMiddle} onPress={pressCard("middleMiddle")} />
        <CardStack cards={middleRight} onPress={pressCard("middleRight")} />
      </View>
      <View style={styles.row}>
        <CardStack cards={bottomLeft} onPress={pressCard("bottomLeft")} />
        <CardStack cards={bottomMiddle} onPress={pressCard("bottomMiddle")} />
        <CardStack cards={bottomRight} onPress={pressCard("bottomRight")} />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: guess === "LOW" ? "orange" : "gray" },
          ]}
          onPress={() => setGuess("LOW")}
        >
          <Text style={styles.buttonText}>Lower</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: guess === "SAME" ? "orange" : "gray" },
          ]}
          onPress={() => setGuess("SAME")}
        >
          <Text style={styles.buttonText}>Same As</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: guess === "HIGH" ? "orange" : "gray" },
          ]}
          onPress={() => setGuess("HIGH")}
        >
          <Text style={styles.buttonText}>Higher</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={setUp} title='Reset' />
      <GameOverModal
        visible={gameOverVisible}
        remainingCards={deck.length}
        onClose={() => setGameOverVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  row: {
    flexDirection: "row",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 16,
    padding: 16,
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: "white",
  },
});

export default Nines;
