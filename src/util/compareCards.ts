import { Card, Comparison } from "../types";

// Is a COMPARISON then b
export default (a: Card, b: Card, comparison: Comparison) => {
  console.log(`Is ${a.number} ${comparison} ${b.number}`);
  if (comparison === "LOW") return a.number < b.number;
  if (comparison === "HIGH") return a.number > b.number;
  return a.number === b.number;
};
