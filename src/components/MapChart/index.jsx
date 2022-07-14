import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";

import { getMarkers } from "../../api";

function MapChart() {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const navigate = useNavigate();
  const { data } = useQuery(["getMarkers"], getMarkers, {
    refetchOnWindowFocus: false,
  });
  const matches = useMediaQuery(`only screen and (min-width: 768px)`);

  const component = (
    <>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              name={geo.properties}
              style={{
                default: {
                  fill: "#324047",
                  outline: "none",
                },
                hover: {
                  fill: "rgb(238, 222, 207)",
                  outline: "none",
                },
                pressed: {
                  fill: "#E42",
                  outline: "none",
                },
              }}
            />
          ))
        }
      </Geographies>

      {data.map(
        ({ _id, country, coordinates, recentlyPhotoUrl, photosNum }) => (
          <Marker key={_id} coordinates={coordinates}>
            <g
              fill="none"
              transform="translate(-15, -36)"
              onClick={() => {
                navigate(`/country/${_id}`);
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 50 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="white"
                  d="M0 7C0 3.13401 3.13401 0 7 0H33C36.866 0 40 3.13401 40 7V33C40 36.866 36.866 40 33 40H7C3.13401 40 0 36.866 0 33V7Z"
                  fill="white"
                />
                <path
                  stroke="white"
                  d="M20.8742 42.4265C20.4932 40.1123 22.5068 43.1123 19.1258 40.4265L15.8254 33.4856C15.4551 32.8191 15.937 35 16.6995 35H23.3005C24.063 35 24.5449 35.8191 24.1746 36.4856L20.8742 42.4265Z"
                  fill="white"
                />
                <path />
                <foreignObject x="1.8" y="1.45" width="100px" height="100px">
                  <MarkerImage src={recentlyPhotoUrl} />
                </foreignObject>
              </svg>
              <foreignObject y="-17" x="23" width="50" height="50">
                <PhotoNum>{photosNum}</PhotoNum>
              </foreignObject>
            </g>
            <text
              textAnchor="middle"
              y="10"
              style={{
                fill: "white",
                fontSize: "9px",
              }}
            >
              {country}
            </text>
          </Marker>
        ),
      )}
    </>
  );

  if (matches)
    return (
      <StyledComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ scale: 180 }}
      >
        {component}
      </StyledComposableMap>
    );

  return (
    <StyledComposableMap
      projection="geoEquirectangular"
      projectionConfig={{ scale: 200 }}
    >
      <ZoomableGroup center={[160, 37]} zoom={2}>
        {component}
      </ZoomableGroup>
    </StyledComposableMap>
  );
}

const StyledComposableMap = styled(ComposableMap)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;

  @media only screen and (min-width: 768px) {
    width: 100vw;
  }
`;

const MarkerImage = styled.img`
  width: 37px;
  height: 37px;
  border-radius: 3px;
  cursor: pointer;
`;

const PhotoNum = styled.p`
  width: 15px;
  height: 15px;
  color: white;
  border-radius: 50%;
  background-color: #ca7358;
  text-align: center;
  line-height: 17px;
  font-size: 10px;
`;

export default MapChart;
