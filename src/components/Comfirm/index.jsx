import styled from "styled-components";
import PropTypes from "prop-types";
import { IoMdPaperPlane } from "react-icons/io";
import useModal from "../../hooks/useModal";

function Confirm({ message }) {
  const { hideModal } = useModal();

  return (
    <>
      <PaperIcon />
      <ConfirmMessage>{message}</ConfirmMessage>
      <ConfirmButton onClick={hideModal}>OK</ConfirmButton>
    </>
  );
}

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
};

const PaperIcon = styled(IoMdPaperPlane)`
  margin-top: 7rem;
  font-size: 12rem;
  color: #265d6e;
`;

const ConfirmMessage = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

const ConfirmButton = styled.button`
  width: 8rem;
  height: 3rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 7rem;
  border: 1px solid #265d6e;
  background: #265d6e;
  color: white;
`;

export default Confirm;
