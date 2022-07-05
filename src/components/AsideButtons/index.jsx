import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useModal from "../../hooks/useModal";
import { isLoginState } from "../../recoil/auth";
import AsideButtonsView from "../ViewAssetComponents/AsideButtonsView";

function AsideButtons() {
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const { showModal } = useModal();

  const AsideButtonsProps = {
    onProfileIconClick: () => {
      if (!isLogin)
        return showModal({
          modalType: "LoginModal",
          modalProps: { title: "Login" },
        });

      return navigate("/my-page");
    },
    onUploadIconClick: () => {
      if (!isLogin)
        return showModal({
          modalType: "LoginModal",
          modalProps: { title: "Login" },
        });

      return showModal({
        modalType: "UploadModal",
        modalProps: { title: "Upload" },
      });
    },
    onBookmarkIconClick: () => {
      if (!isLogin)
        return showModal({
          modalType: "LoginModal",
          modalProps: { title: "Login" },
        });

      return showModal({
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
