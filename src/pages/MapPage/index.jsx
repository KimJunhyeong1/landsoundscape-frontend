import styled from "styled-components";

import MapChart from "../../components/MapChart";
import LogoTitle from "../../components/themes/LogoTitle";

function MapPage() {
  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <MapChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #bcbcbc;
`;

export default MapPage;
