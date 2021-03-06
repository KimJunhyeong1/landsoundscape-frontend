import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

import CountryPageInfo from "../../components/CountryPageInfo";
import ArrowBack from "../../components/themes/ArrowBack";
import LogoTitle from "../../components/themes/LogoTitle";
import SpinnersWrapper from "../../components/themes/SpinnersWrapper";

function CountryPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <ArrowBack
        onClick={() =>
          navigate("/", { state: { isMapPage: true }, replace: true })
        }
      />
      <Suspense
        fallback={
          <SpinnersWrapper>
            <MoonLoader />
          </SpinnersWrapper>
        }
      >
        <CountryPageInfo />
      </Suspense>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #265d6e;
  overflow-y: auto;
`;

export default CountryPage;
