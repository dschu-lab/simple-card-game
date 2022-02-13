import {
  faArrowDownAZ,
  faArrowDownZA,
  faCloudArrowUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useTransition } from "@react-spring/web";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext, SortOrder } from "../contexts/AppContext";
import { Button } from "./layout/Button";

const ButtonContentShell = styled(animated.div)`
  height: 40px;
  display: flex;
  align-items: center;
  position: absolute;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SubmitButton = () => {
  const { selectedCardId, submitSelectedCard, requests } =
    useContext(AppContext);

  const transitions = useTransition(!requests.updating.isActive, {
    from: { translateY: -100 },
    enter: { translateY: 0 },
    leave: { translateY: -100 },
  });

  return (
    <Button
      disabled={selectedCardId === null || requests.updating.isActive}
      onClick={submitSelectedCard}
      style={{ gridColumn: "1 / span 2" }}
      isActive
    >
      {transitions(({ translateY }, item) => {
        return item ? (
          <ButtonContentShell
            style={{
              transform: translateY.to((y) => `translateY(${y}%)`),
            }}
          >
            <FontAwesomeIcon icon={faCloudArrowUp} /> {"Submit"}
          </ButtonContentShell>
        ) : (
          <ButtonContentShell
            style={{
              transform: translateY
                .to({ range: [-100.0, 0.0], output: [100, 0] })
                .to((y) => `translateY(${y}%)`),
            }}
          >
            <span>{"Submitting"}</span>
          </ButtonContentShell>
        );
      })}
    </Button>
  );
};

interface SortButtonData {
  order: SortOrder;
  text: string;
  icon: IconDefinition;
}
const buttonsData: SortButtonData[] = [
  { order: "asc", text: "Sort Ascending", icon: faArrowDownAZ },
  { order: "desc", text: "Sort Descending", icon: faArrowDownZA },
];

const SortButtons = () => {
  const { order, setOrder } = useContext(AppContext);

  return (
    <>
      {buttonsData.map((button) => (
        <Button
          key={button.order}
          isActive={order === button.order}
          onClick={() =>
            setOrder(order === button.order ? "none" : button.order)
          }
        >
          <FontAwesomeIcon icon={button.icon} />
          <span>{button.text}</span>
        </Button>
      ))}
    </>
  );
};

export const Controls = () => {
  return (
    <ControlsShell>
      <ButtonShell>
        <SortButtons />
        <SubmitButton />
      </ButtonShell>
    </ControlsShell>
  );
};

const ControlsShell = styled.div``;

const ButtonShell = styled.nav`
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
`;
