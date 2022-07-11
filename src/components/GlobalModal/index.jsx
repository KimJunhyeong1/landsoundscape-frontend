import { useRecoilValue } from "recoil";

import Modal from "../Modal";
import modalState from "../../recoil/modal";
import Login from "../Login";
import Upload from "../Upload";
import Bookmarks from "../Bookmarks";
import Search from "../Search";

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
    return (
      <Modal {...modalProps}>
        <Bookmarks />
      </Modal>
    );
  }

  if (modalType === "SearchModal") {
    return (
      <Modal {...modalProps}>
        <Search />
      </Modal>
    );
  }

  return <></>;
}

export default GlobalModal;
