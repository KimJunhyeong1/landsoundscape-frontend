import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";
import { getMarkers } from "../../api";

function MapPage() {
  const { data } = useQuery(["getMarkers"], getMarkers, {
    refetchOnWindowFocus: false,
  });
  const navigate = useNavigate();

  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  return (
    <Wrapper>
      <StyledComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ scale: 200 }}
      >
        <ZoomableGroup center={[160, 37]} zoom={2}>
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
                  stroke="#FF5533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    <MarkerImage href={recentlyPhotoUrl} />
                  </svg>
                  <text
                    textAnchor="middle"
                    y="3"
                    x="32"
                    style={{
                      backgroundColor: "white",
                      fill: "white",
                      fontSize: "11px",
                    }}
                  >
                    {photosNum}
                  </text>
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
        </ZoomableGroup>
      </StyledComposableMap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow-y: hidden;
  background-color: #bcbcbc;
`;

const StyledComposableMap = styled(ComposableMap)`
  height: 100vh;
`;

const MarkerImage = styled.image`
  width: 82%;
  height: 95%;
`;

export default MapPage;
