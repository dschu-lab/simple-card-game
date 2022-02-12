import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppContext";
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

const SortButtons = () => {
  const { order, setOrder } = useContext(AppContext);

  return (
    <>
      <Button
        isActive={order === "asc"}
        onClick={() => setOrder(order === "asc" ? "none" : "asc")}
      >
        {"Sort Asc"}
      </Button>
      <Button
        isActive={order === "desc"}
        onClick={() => setOrder(order === "desc" ? "none" : "desc")}
      >
        {"Sort Desc"}
      </Button>
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
