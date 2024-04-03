export type Player = {
  name: string;
  scores: Score[];
  id: string;
};

export type Score = {
  bet: number;
  plus: boolean;
};
