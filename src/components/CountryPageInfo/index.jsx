import { useQuery } from "react-query";
import _ from "lodash";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getMarker } from "../../api";
import CityPhotoList from "../CityPhotoList";

function CountryPageInfo() {
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
    <>
      <CountryName>{data.country}</CountryName>
      <CityPhotoList groupedCityPhotos={groupedCityPhotos} />
    </>
  );
}

const CountryName = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
  margin-top: 8rem;
`;

export default CountryPageInfo;
