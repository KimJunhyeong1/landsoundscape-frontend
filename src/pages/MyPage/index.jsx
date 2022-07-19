import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ArrowBack from "../../components/themes/ArrowBack";
import MyPageInfo from "../../components/MyPageInfo";
import LogoTitle from "../../components/themes/LogoTitle";

function MyPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <ArrowBack onClick={() => navigate("/")} />
      <MyPageInfo />
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

  @media only screen and (min-width: 768px) {
    padding: 1rem 10rem;
  }
`;

export default MyPage;
