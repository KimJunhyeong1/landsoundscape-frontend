import { useRecoilValue } from "recoil";
import Modal from "../Modal";
import modalState from "../../recoil/modal";
import Login from "../Login";
import Upload from "../Upload";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  if (modalType === "LoginModal") {
    return (
      <Modal {...modalProps}>
        <Login />
      </Modal>
    );
  }

  if (modalType === "UploadModal") {
    return (
      <Modal {...modalProps}>
        <Upload />
      </Modal>
    );
  }

  if (modalType === "BookmarkModal") {
    return <Modal {...modalProps}></Modal>;
  }

  if (modalType === "SearchModal") {
    return <Modal {...modalProps}></Modal>;
  }

  return <></>;
}

export default GlobalModal;
