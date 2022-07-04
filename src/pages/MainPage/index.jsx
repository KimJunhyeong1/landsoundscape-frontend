import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ObjectID from "bson-objectid";

import BottomButtons from "../../components/BottomButtons";
import AsideButtons from "../../components/AsideButtons";
import { getRandomPhoto } from "../../api";
import MainPageHeader from "../../components/MainPageHeader";

function MainPage() {
  const randomObjectId = new ObjectID().toHexString();
  const [currentPhotoId, setCurrentPhotoId] = useState(randomObjectId);

  const { data, refetch } = useQuery(["randomPhoto"], () =>
    getRandomPhoto(currentPhotoId),
  );

  useEffect(() => {
    setCurrentPhotoId(data._id);
  }, [data]);

  return (
    <PhotoWrapper>
      <Photo src={data.imageUrl} />
      <MainPageHeader city={data.city} country={data.country} />
      <BottomButtons onNewButtonClick={refetch} soundUrl={data.soundUrl} />
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
