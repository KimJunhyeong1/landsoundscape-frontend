import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ObjectID from "bson-objectid";
import { useRecoilValue } from "recoil";
import { FullPage, Slide } from "react-full-page";
import { useMediaQuery } from "@react-hook/media-query";

import BottomButtons from "../../components/BottomButtons";
import AsideButtons from "../../components/AsideButtons";
import { getRandomPhotoAndBookmarks, insertBookmark } from "../../api";
import MainPageHeader from "../../components/MainPageHeader";
import loginState from "../../recoil/auth";
import useModal from "../../hooks/useModal";
import MapPage from "../MapPage";
import modalState from "../../recoil/modal/atom";
import LogoTitle from "../../components/themes/LogoTitle";

function MainPage() {
  const randomObjectId = new ObjectID().toHexString();
  const matches = useMediaQuery(`only screen and (min-width: 768px)`);
  const isModalOpen = useRecoilValue(modalState);
  const { showModal } = useModal();
  const userData = useRecoilValue(loginState);
  const [currentPhotoId, setCurrentPhotoId] = useState(randomObjectId);
  const bookmarkMutation = useMutation(insertBookmark);
  const [isBookmark, setIsBookmark] = useState(false);
  const { data, refetch } = useQuery(
    ["randomPhoto", userData?._id],
    () => getRandomPhotoAndBookmarks(currentPhotoId, userData?._id),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleBookmarkButtonClick = () => {
    if (!userData) {
      showModal({
        modalType: "LoginModal",
        modalProps: { title: "Login" },
      });

      return;
    }

    bookmarkMutation.mutate(
      { userId: userData?._id, photoId: currentPhotoId },
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
    setCurrentPhotoId(data.photo?._id);
  }, [data]);

  return (
    <>
      {matches && <LogoTitle>LandSoundScape</LogoTitle>}
      <FullPage scrollMode={isModalOpen ? "normal" : "full-page"}>
        <Slide>
          <PhotoWrapper>
            <Photo src={data.photo?.imageUrl} />
            <MainPageHeader
              creator={data.photo?.creator}
              city={data.photo?.city}
              country={data.photo?.country}
            />
            <BottomButtons
              onNewButtonClick={refetch}
              onBookmarkButtonClick={handleBookmarkButtonClick}
              photoId={currentPhotoId}
              soundUrl={data.photo?.soundUrl}
              isBookmark={isBookmark}
            />
            <AsideButtons />
          </PhotoWrapper>
        </Slide>
        <Slide>
          <MapPage />
        </Slide>
      </FullPage>
    </>
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

export default MainPage;
