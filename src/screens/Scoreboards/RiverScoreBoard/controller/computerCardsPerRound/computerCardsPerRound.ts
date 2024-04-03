/**
 * Computer the number of cards dealt per round
 *
 * @param {number} roundIndex - The curent roundIndex. 0 based
 * @param {number} maxRounds - The max number of rounds
 * @returns {number} The number of cards to be dealt for the given params
 */
export default (roundIndex: number, maxRounds: number) =>
  // Past the mid point
  Math.ceil(maxRounds / 2) > roundIndex
    ? roundIndex + 1
    : maxRounds - roundIndex;
