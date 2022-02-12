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
      {"Submit"}
    </Button>
  );
};

interface SortButtonData {
  order: SortOrder;
  buttonText: string;
}
const buttonsData: SortButtonData[] = [
  { order: "asc", buttonText: "Sort Ascending" },
  { order: "desc", buttonText: "Sort Descending" },
];

const SortButtons = () => {
  const { order, setOrder } = useContext(AppContext);

  return (
    <>
      {buttonsData.map((data) => (
        <Button
          isActive={order === data.order}
          onClick={() => setOrder(order === data.order ? "none" : data.order)}
          children={data.buttonText}
        />
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
