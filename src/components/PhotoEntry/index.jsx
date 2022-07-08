import styled from "styled-components";
import PropTypes from "prop-types";
import { ImLocation2 } from "react-icons/im";

function PhotoEntry({ imageUrl, country, city }) {
  return (
    <Wrapper>
      <PhotoView src={imageUrl} />
      <Location>
        <LocationIcon />
        <LocationContent>
          {city} - {country}
        </LocationContent>
      </Location>
    </Wrapper>
  );
}

PhotoEntry.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  position: relative;
`;

const PhotoView = styled.img`
  width: 30rem;
  height: 20rem;
  object-fit: cover;
`;

const Location = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationIcon = styled(ImLocation2)`
  font-size: 1rem;
  color: white;
`;

const LocationContent = styled.span`
  color: white;
`;

export default PhotoEntry;
