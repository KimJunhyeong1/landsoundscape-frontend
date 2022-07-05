import useModal from "../../hooks/useModal";
import AsideButtonsView from "../ViewAssetComponents/AsideButtonsView";

function AsideButtons() {
  const { showModal } = useModal();

  const AsideButtonsProps = {
    onProfileIconClick: () => {
      showModal({ modalType: "LoginModal", modalProps: { title: "Login" } });
    },
    onUploadIconClick: () => {
      showModal({ modalType: "UploadModal", modalProps: { title: "Upload" } });
    },
    onBookmarkIconClick: () => {
      showModal({
        modalType: "BookmarkModal",
        modalProps: { title: "Bookmark" },
      });
    },
    onSearchIconClick: () => {
      showModal({ modalType: "SearchModal", modalProps: { title: "Search" } });
    },
  };

  return <AsideButtonsView {...AsideButtonsProps} />;
}

export default AsideButtons;
