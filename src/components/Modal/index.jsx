import ReactDom from "react-dom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MoonLoader } from "react-spinners";

import useModal from "../../hooks/useModal";
import SpinnersWrapper from "../themes/SpinnersWrapper";

export default function Modal({ children, title }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={hideModal} />
        <Suspense
          fallback={
            <SpinnersWrapper>
              <MoonLoader />
            </SpinnersWrapper>
          }
        >
          <ErrorBoundary
            fallbackRender={({ error }) => <div>{error.message}</div>}
          >
            {children}
          </ErrorBoundary>
        </Suspense>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById("portal"),
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 900;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  height: 60vh;
  padding: 1rem 1rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;

  @media only screen and (min-width: 768px) {
    width: 45vw;
    padding: 1rem 2.5rem;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
  }
`;

const ModalTitle = styled.span`
  font-size: 2rem;
  color: #ca7358;
  font-weight: 800;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 2.57%;
  left: 90.6%;
  font-size: 2rem;
  color: #bcbcbc;
  cursor: pointer;
`;
