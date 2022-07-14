import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import shortid from "shortid";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import useTheme from "../../hooks/useTheme";
import ScoreColumn from "./ScoreColumn";
import updateScore from "./processing/updateScore/updateScore";

export type Round = {
  bet: number;
  status: "YES" | "NO" | "UNKNOWN";
  total: number;
  id: string;
};

export type PlayerScore = {
  playerName: string;
  rounds: Round[];
  id: string;
};

const RiverScoreboard = () => {
  const [players, setPlayers] = useState<PlayerScore[]>([
    { playerName: "", rounds: [], id: shortid.generate() },
  ]);
  const theme = useTheme();

  const addPlayer = useCallback(() => {
    setPlayers([
      ...players,
      {
        playerName: "",
        rounds: players[0].rounds.map(() => ({
          bet: 0,
          status: "UNKNOWN",
          total: 0,
          id: shortid.generate(),
        })),
        id: shortid.generate(),
      },
    ]);
  }, [players]);

  const changePlayerName = useCallback(
    (index: number) => (text: string) => {
      setPlayers([
        ...players.slice(0, index),
        { ...players[index], playerName: text },
        ...players.slice(index + 1),
      ]);
    },
    [players]
  );

  const addRound = useCallback(() => {
    setPlayers(
      players.map((p) => ({
        ...p,
        rounds: [
          ...p.rounds,
          {
            bet: 0,
            status: "UNKNOWN",
            total: 0,
            id: shortid.generate(),
          },
        ],
      }))
    );
  }, [players]);

  const updatePlayerBet = useCallback(
    (index: number) => (roundIndex: number) => (text: string) => {
      setPlayers(
        updateScore([
          ...players.slice(0, index),
          {
            ...players[index],
            rounds: [
              ...players[index].rounds.slice(0, roundIndex),
              {
                ...players[index].rounds[roundIndex],
                bet: text === "" ? 0 : Number.parseInt(text),
              },
              ...players[index].rounds.slice(roundIndex + 1),
            ],
          },
          ...players.slice(index + 1),
        ])
      );
    },
    [players]
  );

  const updatePlayerRoundStatus = useCallback(
    (index: number) => (roundIndex: number) => (text: "YES" | "NO") => {
      setPlayers(
        updateScore([
          ...players.slice(0, index),
          {
            ...players[index],
            rounds: [
              ...players[index].rounds.slice(0, roundIndex),
              {
                ...players[index].rounds[roundIndex],
                status: text,
              },
              ...players[index].rounds.slice(roundIndex + 1),
            ],
          },
          ...players.slice(index + 1),
        ])
      );
    },
    [players]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item, index }) => (
            <ScoreColumn
              player={item}
              updateName={changePlayerName(index)}
              updateBet={updatePlayerBet(index)}
              updateStatus={updatePlayerRoundStatus(index)}
            />
          )}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={addPlayer}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 8,
                padding: 8,
              }}
            >
              <MaterialCommunityIcons
                name='plus'
                size={moderateScale(24, 0.2)}
                color={"gray"}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          margin: 8,
          padding: 8,
        }}
        onPress={addRound}
      >
        <MaterialCommunityIcons
          name='plus'
          size={moderateScale(24, 0.2)}
          color={"gray"}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RiverScoreboard;
