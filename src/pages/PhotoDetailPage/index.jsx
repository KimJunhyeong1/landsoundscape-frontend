import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import BottomButtons from "../../components/BottomButtons";
import AsideButtons from "../../components/AsideButtons";
import { getPhotoAndBookmarks, insertBookmark } from "../../api";
import MainPageHeader from "../../components/MainPageHeader";
import loginState from "../../recoil/auth";
import useModal from "../../hooks/useModal";

function PhotoDetailPage() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const userData = useRecoilValue(loginState);
  const bookmarkMutation = useMutation(insertBookmark);
  const [isBookmark, setIsBookmark] = useState(false);
  const { data } = useQuery(
    ["getPhoto", photoId, userData?._id],
    () => getPhotoAndBookmarks(photoId, userData?._id),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleNewButtonClick = () => {
    navigate("/");
  };

  const handleBookmarkButtonClick = () => {
    if (!userData) {
      showModal({
        modalType: "LoginModal",
        modalProps: { title: "Login" },
      });

      return;
    }

    bookmarkMutation.mutate(
      { userId: userData?._id, photoId },
      {
        onSuccess: payload => {
          setIsBookmark(payload.bookmarks.some(id => id === data.photo?._id));
        },
      },
    );
  };

  useEffect(() => {
    setIsBookmark(
      data.user?.bookmarks.some(element => element._id === data.photo?._id),
    );
  }, [data]);

  return (
    <PhotoWrapper>
      <Photo src={data.photo?.imageUrl} />
      <MainPageHeader
        creator={data.photo?.creator}
        city={data.photo?.city}
        country={data.photo?.country}
      />
      <BottomButtons
        onNewButtonClick={handleNewButtonClick}
        onBookmarkButtonClick={handleBookmarkButtonClick}
        photoId={photoId}
        soundUrl={data.photo?.soundUrl}
        isBookmark={isBookmark}
      />
      <AsideButtons />
    </PhotoWrapper>
  );
}

const PhotoWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Photo = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

export default PhotoDetailPage;
