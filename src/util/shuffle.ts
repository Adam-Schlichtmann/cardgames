import { Card } from "../types";
import getDeck from "./getDeck";

export default (cards?: Card[]) =>
  (cards ?? getDeck())
    .map((c) => ({ ...c, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...rest }) => ({ ...rest }));
