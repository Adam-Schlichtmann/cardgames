import { NINES, RIVER_SCORE_BOARD } from "./AppNavigation.constants";

type Empty = Record<never, never>;

export type ParamList = {
  [NINES]: Empty;
  [RIVER_SCORE_BOARD]: Empty;
};
