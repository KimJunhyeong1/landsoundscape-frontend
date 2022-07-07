import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ObjectID from "bson-objectid";
import { useRecoilValue } from "recoil";

import BottomButtons from "../../components/BottomButtons";
import AsideButtons from "../../components/AsideButtons";
import { getRandomPhotoAndBookmarks, insertBookmark } from "../../api";
import MainPageHeader from "../../components/MainPageHeader";
import loginState from "../../recoil/auth";

function MainPage() {
  const randomObjectId = new ObjectID().toHexString();
  const userData = useRecoilValue(loginState);
  const [currentPhotoId, setCurrentPhotoId] = useState(randomObjectId);
  const bookmarkMutation = useMutation(insertBookmark);
  const [isBookmark, setIsBookmark] = useState(false);
  const { data, refetch } = useQuery(
    ["randomPhoto"],
    () => getRandomPhotoAndBookmarks(currentPhotoId, userData?._id),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleBookmarkButtonClick = () => {
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

export default MainPage;
