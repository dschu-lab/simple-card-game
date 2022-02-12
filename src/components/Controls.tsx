import {
  faArrowDownAZ,
  faArrowDownZA,
  faCloudArrowUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext, SortOrder } from "../contexts/AppContext";
import { Button } from "./layout/Button";
import { Heading } from "./layout/Heading";

const SubmitButton = () => {
  const { selectedCardId, submitSelectedCard, requests } =
    useContext(AppContext);

  return (
    <Button
      disabled={selectedCardId === null || requests.updating.isActive}
      onClick={submitSelectedCard}
      style={{ gridColumn: "1 / span 2" }}
      isActive
    >
      {!requests.updating.isActive && <FontAwesomeIcon icon={faCloudArrowUp} />}
      <span>{requests.updating.isActive ? "Submitting" : "Submit"}</span>
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
      <Heading>{"Controls"}</Heading>
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
