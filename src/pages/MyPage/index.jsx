import { Suspense } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import ArrowBack from "../../components/themes/ArrowBack";
import SpinnersWrapper from "../../components/themes/SpinnersWrapper";
import MyPageInfo from "../../components/MyPageInfo";

function MyPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <ArrowBack onClick={() => navigate("/")} />
      <Suspense
        fallback={
          <SpinnersWrapper>
            <MoonLoader />
          </SpinnersWrapper>
        }
      >
        <MyPageInfo />
      </Suspense>
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

const LogoTitle = styled.span`
  color: white;
  font-weight: 800;
  font-size: 2rem;
`;

export default MyPage;
