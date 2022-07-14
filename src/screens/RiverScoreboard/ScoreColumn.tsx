import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ToggleButton } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import useTheme from "../../hooks/useTheme";
import { PlayerScore } from "./RiverScoreBoard";

type Props = {
  updateName: (text: string) => void;
  player: PlayerScore;
  updateBet: (roundIndex: number) => (text: string) => void;
  updateStatus: (roundIndex: number) => (text: "YES" | "NO") => void;
};

const ScoreColumn = ({
  updateName,
  player,
  updateBet,
  updateStatus,
}: Props) => {
  return (
    <View style={styles.column}>
      <TextInput
        style={styles.input}
        value={player.playerName}
        onChangeText={updateName}
        selectTextOnFocus
        placeholder='Name'
      />
      <FlatList
        data={player.rounds}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }}>
            <TextInput
              value={`${item.bet}`}
              style={styles.input}
              onChangeText={updateBet(index)}
              selectTextOnFocus
            />
            <View style={styles.toggleButtonGroup}>
              <TouchableOpacity
                onPress={() => updateStatus(index)("NO")}
                style={[
                  styles.toggleButton,
                  item.status === "NO" && styles.selectedToggle,
                ]}
              >
                <MaterialCommunityIcons
                  name='cancel'
                  size={moderateScale(28, 0.2)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateStatus(index)("YES")}
                style={[
                  styles.toggleButton,
                  item.status === "YES" && styles.selectedToggle,
                ]}
              >
                <MaterialCommunityIcons
                  name='check'
                  size={moderateScale(28, 0.2)}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.totalText}>Total: {item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: { flex: 1, flexDirection: "column", maxWidth: 150, margin: 8 },
  toggleButtonGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    marginBottom: 4,
    justifyContent: "space-evenly",
  },
  toggleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedToggle: { backgroundColor: "gray" },
  input: {
    padding: 8,
    width: 100,
    maxHeight: 50,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 4,
  },
  totalText: { marginBottom: 4, textAlign: "right" },
});

export default ScoreColumn;
