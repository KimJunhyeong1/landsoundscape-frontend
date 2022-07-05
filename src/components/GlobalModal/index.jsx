import { useRecoilValue } from "recoil";
import Modal from "../Modal";
import modalState from "../../recoil/modal";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  if (modalType === "LoginModal") {
    return <Modal {...modalProps}></Modal>;
  }

  if (modalType === "UploadModal") {
    return <Modal {...modalProps}></Modal>;
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
