import styled from "styled-components";

import MapChart from "../../components/MapChart";

function MapPage() {
  return (
    <Wrapper>
      <MapChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #bcbcbc;
`;

export default MapPage;
