import { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
import { Card } from "../models/Card";
import { StyledCard } from "./card/StyledCard";
import { CardInner } from "./card/CardInner";
import { Heading } from "./layout/Heading";
import { useTransition } from "@react-spring/web";

const CardDetail = ({ card, style }: { card: Card; style: any }) => (
  <StyledCard $swatch="pink" style={style}>
    <CardInner card={card} />
  </StyledCard>
);

export const Details = () => {
  const { cards, selectedCardId } = useContext(AppContext);

  const card = useMemo(
    () => cards.find((card) => card.id === selectedCardId),
    [cards, selectedCardId]
  );

  const transition = useTransition(card, {
    key: card?.id,
    from: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "-100%",
      opacity: 0,
    },
    enter: { opacity: 1, left: "0%" },
    leave: { opacity: 0, left: "-100%" },
  });

  return (
    <DetailsShell>
      <Heading>{"Details"}</Heading>
      <div style={{ position: "relative", flexGrow: 1 }}>
        {transition(
          (styles, card) => card && <CardDetail card={card} style={styles} />
        )}
      </div>
    </DetailsShell>
  );
};

const DetailsShell = styled.div`
  display: flex;
  flex-direction: column;
`;
