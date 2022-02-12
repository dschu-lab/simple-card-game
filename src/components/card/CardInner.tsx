import { Card } from "../../models/Card";
import { Heading } from "../layout/Heading";

export const CardInner = ({ card }: { card: Card }) => (
  <>
    <Heading as="h2">{card.realName}</Heading>
    <Heading as="h4">{card.playerName}</Heading>
    <Heading as="h5">{card.asset?.name}</Heading>
  </>
);
