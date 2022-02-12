import { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
import { Card } from "../models/Card";
import { StyledCard } from "./card/StyledCard";
import { CardInner } from "./card/CardInner";
import { Heading } from "./layout/Heading";

const CardDetail = ({ card }: { card: Card }) => (
  <StyledCard swatch="pink">
    <CardInner card={card} />
  </StyledCard>
);

export const Details = () => {
  const { cards, selectedCardId } = useContext(AppContext);

  const card = useMemo(
    () => cards.find((card) => card.id === selectedCardId),
    [cards, selectedCardId]
  );

  return (
    <DetailsShell>
      <Heading>{"Details"}</Heading>
      {card && <CardDetail card={card} />}
    </DetailsShell>
  );
};

const DetailsShell = styled.div`
  display: flex;
  flex-direction: column;
`;
