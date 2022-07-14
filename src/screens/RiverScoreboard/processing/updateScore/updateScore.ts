import { PlayerScore, Round } from "../../RiverScoreBoard";

export default (players: PlayerScore[]): PlayerScore[] =>
  players.map((p) => ({
    ...p,
    rounds: p.rounds.map((r, i, array) => {
      const lastRound = i === 0 ? undefined : array[i - 1];
      const multiplier = (status: Round["status"]): number => {
        if (status === "NO") return -1;
        if (status === "YES") return 1;
        return 0;
      };
      return {
        ...r,
        total: r.bet * multiplier(r.status) + (lastRound?.total ?? 0),
      };
    }),
  }));
