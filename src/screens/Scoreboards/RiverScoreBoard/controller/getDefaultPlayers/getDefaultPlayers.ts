import { randomUUID } from "expo-crypto";
import { Player } from "../../RiverScoreBoard.types";
import computeMaxRounds from "../computeMaxRounds";

/**
 *
 */
export default (numberOfPlayers: number): Player[] =>
  Array.from<Player>({ length: numberOfPlayers }).map(() => ({
    name: "",
    id: randomUUID(),
    scores: Array.from<Player["scores"][number]>({
      length: computeMaxRounds(numberOfPlayers),
    }).fill({
      bet: 0,
      plus: true,
    }),
  }));
