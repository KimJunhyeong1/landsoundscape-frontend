import _ from "lodash";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

import { getMarker } from "../../api";
import CityPhotoList from "../../components/CityPhotoList";

function CountryPage() {
  const navigate = useNavigate();
  const { countryId } = useParams();
  const { data } = useQuery(
    ["getMarker", countryId],
    () => getMarker(countryId),
    {
      refetchOnWindowFocus: false,
    },
  );
  const groupedCityPhotos = Object.entries(
    _.mapValues(_.groupBy(data.photos, "city")),
  );

  return (
    <Wrapper>
      <LogoTitle>LandSoundScape</LogoTitle>
      <ArrowBack onClick={() => navigate("/")} />
      <CountryName>{data.country}</CountryName>
      <CityPhotoList groupedCityPhotos={groupedCityPhotos} />
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

const LogoTitle = styled.span`
  color: white;
  font-weight: 800;
  font-size: 2rem;
`;

const ArrowBack = styled(BiArrowBack)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  font-size: 2rem;
`;

const CountryName = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
  margin-top: 3rem;
`;

export default CountryPage;
