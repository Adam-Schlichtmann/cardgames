import { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { randomUUID } from "expo-crypto";

import { Player, Score } from "./RiverScoreBoard.types";
import { PlayerScoreColumn } from "./components";
import { computeMaxRounds, getDefaultPlayers } from "./controller";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

const RiverScoreBoard = () => {
  const [players, setPlayers] = useState<Player[]>(() => getDefaultPlayers(4));

  const addPlayer = () => {
    const maxRounds = computeMaxRounds(players.length + 1);
    setPlayers((prev) => [
      ...prev.map((p) => ({
        ...p,
        scores: p.scores.slice(0, maxRounds),
      })),
      { name: "", scores: Array(maxRounds).fill(0), id: randomUUID() },
    ]);
  };

  const removePlayer = (id: string) => {
    const maxRounds = computeMaxRounds(players.length - 1);
    setPlayers((prev) => {
      const removeIndex = prev.findIndex((p) => p.id === id);
      return [
        ...prev.slice(0, removeIndex).map((p) => ({
          ...p,
          scores: [...p.scores, ...Array(maxRounds - p.scores.length).fill(0)],
        })),
        ...prev.slice(removeIndex + 1).map((p) => ({
          ...p,
          scores: [...p.scores, ...Array(maxRounds - p.scores.length).fill(0)],
        })),
      ];
    });
  };

  const updatePlayer = (
    id: string,
    updateFn: (prev: Player) => Partial<Player>
  ) => {
    setPlayers((prev) => {
      const playerIndex = prev.findIndex((p) => p.id === id);

      return [
        ...prev.slice(0, playerIndex),
        { ...prev[playerIndex], ...updateFn(prev[playerIndex]) },
        ...prev.slice(playerIndex + 1),
      ];
    });
  };
  const theme = useTheme();

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <View>
        <FlatList
          data={players}
          horizontal
          renderItem={({ item }) => (
            <PlayerScoreColumn
              player={item}
              removePlayer={removePlayer}
              updatePlayer={updatePlayer}
            />
          )}
          ListFooterComponent={
            <IconButton
              mode="outlined"
              iconColor={theme.colors.primary}
              onPress={addPlayer}
              icon="plus"
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default RiverScoreBoard;
