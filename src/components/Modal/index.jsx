import ReactDom from "react-dom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import useModal from "../../hooks/useModal";

export default function Modal({ children, title }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={hideModal} />
        <Suspense fallback={<h1>Loading...</h1>}>
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
  height: 50vh;
  padding: 1rem 1rem 0;
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
