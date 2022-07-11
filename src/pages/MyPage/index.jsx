import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { getMyPhotos } from "../../api";
import loginState from "../../recoil/auth";
import ArrowBack from "../../components/themes/ArrowBack";
import MyPhotoList from "../../components/MyPhotoList";

function MyPage() {
  const userData = useRecoilValue(loginState);
  const navigate = useNavigate();
  const { data } = useQuery(
    ["getMyPhotos", userData?._id],
    () => getMyPhotos(userData?._id),
    { refetchOnWindowFocus: false },
  );

  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <ArrowBack onClick={() => navigate("/")} />
      <UserName>{`${userData.name}'s Photos`}</UserName>
      <MyPhotoList list={data.myPhotos} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 1rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #265d6e;
  overflow-y: auto;
`;

const LogoTitle = styled.span`
  color: white;
  font-weight: 800;
  font-size: 2rem;
`;

const UserName = styled.span`
  align-self: flex-start;
  margin-left: 3rem;
  margin-top: 6rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
`;

export default MyPage;
