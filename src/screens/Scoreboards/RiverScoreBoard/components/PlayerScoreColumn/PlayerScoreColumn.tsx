import { FlatList, StyleSheet, View } from "react-native";
import {
  IconButton,
  TextInput,
  useTheme,
  Text,
  Divider,
} from "react-native-paper";

import { Player } from "../../RiverScoreBoard.types";
import { computeScore, computerCardsPerRound } from "../../controller";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
  },
  input: {
    width: 100,
    height: 40,
    marginBottom: 4,
  },
  icon: {
    alignSelf: "center",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

type Props = {
  player: Player;
  updatePlayer: (
    id: string,
    updateFn: (prev: Player) => Partial<Player>
  ) => void;
  removePlayer: (id: string) => void;
};

const NUM_REG = /\d/;

const PlayerScoreColumn = ({ player, removePlayer, updatePlayer }: Props) => {
  const updateName = (name: string) =>
    updatePlayer(player.id, () => ({ name }));

  const updateBet = (index: number) => (score: string) => {
    if (NUM_REG.test(score) || score === "") {
      updatePlayer(player.id, ({ scores }) => ({
        scores: [
          ...scores.slice(0, index),
          {
            ...scores[index],
            bet: score === "" ? 0 : Number.parseInt(score, 10),
          },
          ...scores.slice(index + 1),
        ],
      }));
    }
  };

  const togglePlus = (index: number) => () => {
    updatePlayer(player.id, ({ scores }) => ({
      scores: [
        ...scores.slice(0, index),
        {
          ...scores[index],
          plus: !scores[index].plus,
        },
        ...scores.slice(index + 1),
      ],
    }));
  };

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        style={styles.input}
        label="Name"
        onChangeText={updateName}
        value={player.name}
        maxLength={10}
        returnKeyType="done"
      />
      <FlatList
        data={player.scores}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 48 }}
        renderItem={({ item, index }) => (
          <>
            <TextInput
              inputMode="numeric"
              mode="outlined"
              style={styles.input}
              label={`Bet ${computerCardsPerRound(
                index,
                player.scores.length
              )}`}
              returnKeyType="done"
              onChangeText={updateBet(index)}
              value={item.bet.toString()}
              maxLength={2}
              error={
                item.bet > computerCardsPerRound(index, player.scores.length)
              }
            />
            <Divider bold />
            <View style={styles.totalRow}>
              <Text>
                {`${computeScore(player.scores.slice(0, index + 1))}`}
              </Text>
              <IconButton
                mode="outlined"
                iconColor={
                  item.plus ? theme.colors.primary : theme.colors.error
                }
                icon={item.plus ? "plus" : "minus"}
                onPress={togglePlus(index)}
              />
            </View>
          </>
        )}
        ListFooterComponent={
          <IconButton
            style={styles.icon}
            mode="outlined"
            iconColor={theme.colors.error}
            icon="trash-can-outline"
            onPress={() => removePlayer(player.id)}
          />
        }
      />
    </View>
  );
};

export default PlayerScoreColumn;
