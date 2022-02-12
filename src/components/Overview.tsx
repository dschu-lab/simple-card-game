import { useSpring } from "@react-spring/web";
import { useContext, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { AppContext } from "../contexts/AppContext";
import { Card } from "../models/Card";
import { swatchGradient } from "../style/theme";
import { sortByRealName } from "../utils/sortByRealName";
import { CardInner } from "./card/CardInner";
import { StyledInteractiveCard } from "./card/StyledCard";
import { Heading } from "./layout/Heading";

const OverviewCard = ({ card }: { card: Card }) => {
  const { selectedCardId, setSelectedCardId } = useContext(AppContext);
  const isSelected = selectedCardId === card.id;
  const handleClick = () => setSelectedCardId(!isSelected ? card.id : null);

  const theme = useTheme();

  const styles = useSpring({
    background: isSelected
      ? swatchGradient(theme, "yellow")
      : swatchGradient(theme, "dream"),
  });

  return (
    <StyledInteractiveCard onClick={handleClick} $swatch="dream" style={styles}>
      <CardInner card={card} />
    </StyledInteractiveCard>
  );
};

export const Overview = () => {
  const { cards, order } = useContext(AppContext);
  const [sortedCards, setSortedCards] = useState<Card[]>([]);

  useEffect(() => {
    if (order === "none") {
      setSortedCards(cards);
    } else {
      setSortedCards([...cards].sort(sortByRealName(order)));
    }
  }, [cards, order]);

  return (
    <OverviewShell>
      <Heading>{"Overview"}</Heading>
      <OverviewCardsShell>
        {sortedCards.map((card) => (
          <OverviewCard key={card.id} card={card} />
        ))}
      </OverviewCardsShell>
    </OverviewShell>
  );
};

const OverviewShell = styled.div`
  grid-column: 1 / span 2;
`;

const OverviewCardsShell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.small};
  grid-template-columns: 1fr 1fr 1fr;
`;
