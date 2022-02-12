import {
  faCheck,
  faCircleInfo,
  faClose,
  faTriangleExclamation,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useTransition } from "@react-spring/web";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { ToastMessageContext } from "../contexts/ToastMessageContext";
import { ToastMessage } from "../models/ToastMessage";
import { swatchGradient } from "../style/theme";
import { Heading } from "./layout/Heading";

const ToastMessagesShell = styled.div`
  box-sizing: border-box;
  align-items: end;
  display: flex;
  flex-direction: column-reverse;
  padding: ${({ theme }) => theme.spacing.large};
  gap: ${({ theme }) => theme.spacing.medium};
  height: 100vh;
  pointer-events: none;
  position: absolute;
  width: 100vw;
  z-index: ${({ theme }) => theme.layer.super};
`;

const StyledToast = styled(animated.div)`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.inverted};
  border-radius: ${({ theme }) => theme.border.radius.small};
  color: ${({ theme }) => theme.primary};
  overflow: hidden;
  pointer-events: all;
  width: 300px;
`;

interface IconHolderProps {
  $swatch?: SwatchKey;
}
const IconHolder = styled.div<IconHolderProps>`
  font-size: 25px;
  color: ${({ theme }) => theme.inverted};
  background: ${({ theme, $swatch = "ice" }) => swatchGradient(theme, $swatch)};
  align-items: center;
  display: flex;
  height: 90px;
  justify-content: center;
  width: 90px;
`;

const ToastInner = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const TransparentButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0 none;
  background-color: transparent;

  &:hover  {
    cursor: pointer;
  }
`;

const CloseButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <TransparentButton aria-label="Close message" onClick={onClick}>
      <FontAwesomeIcon icon={faClose} />
    </TransparentButton>
  );
};

const Toast = ({ message, style }: { message: ToastMessage; style: any }) => {
  const { removeMessage } = useContext(ToastMessageContext);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      removeMessage(message.id);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message.id, removeMessage]);

  let icon: IconDefinition;
  let swatch: SwatchKey;
  switch (message.type) {
    case "success":
      icon = faCheck;
      swatch = "dream";
      break;
    case "error":
      icon = faTriangleExclamation;
      swatch = "yellow";
      break;
    case "info":
    default:
      icon = faCircleInfo;
      swatch = "ice";
      break;
  }

  return (
    <StyledToast key={message.id} style={style}>
      <IconHolder $swatch={swatch}>
        <FontAwesomeIcon icon={icon} />
      </IconHolder>
      <ToastInner>
        <Heading as="h4">{message.title}</Heading>
        <Heading as="h5">{message.description}</Heading>
      </ToastInner>
      <CloseButton onClick={() => removeMessage(message.id)} />
    </StyledToast>
  );
};

export const ToastMessageDisplay = () => {
  const { messages } = useContext(ToastMessageContext);

  const transitions = useTransition(messages, {
    keys: (message) => message.id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 90 },
    leave: { opacity: 0, height: 0 },
  });

  return (
    <ToastMessagesShell>
      {transitions(
        (styles, item) => item && <Toast message={item} style={styles} />
      )}
    </ToastMessagesShell>
  );
};
