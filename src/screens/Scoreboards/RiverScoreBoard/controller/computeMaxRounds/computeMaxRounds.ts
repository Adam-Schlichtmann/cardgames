/**
 *
 */
export default (numberOfPlayers: number) =>
  Math.floor(52 / numberOfPlayers) * 2 - 1;
