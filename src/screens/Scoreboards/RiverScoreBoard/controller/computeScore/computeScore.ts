import { Score } from "../../RiverScoreBoard.types";

/**
 *
 */
export default (scores: Score[]) =>
  scores.reduce(
    (acc, item) =>
      acc + (item.plus ? 1 : -1) * Number.parseInt(`1${item.bet}`, 10),
    0
  );
