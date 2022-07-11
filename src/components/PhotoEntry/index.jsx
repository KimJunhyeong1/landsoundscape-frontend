import styled from "styled-components";
import PropTypes from "prop-types";
import { ImLocation2 } from "react-icons/im";

function PhotoEntry({ imageUrl, country, city, tags }) {
  return (
    <Wrapper>
      <PhotoView src={imageUrl} />
      <Location>
        <LocationIcon />
        <LocationContent>
          {city} - {country}
        </LocationContent>
      </Location>
      <Tags>{tags.join(", ")}</Tags>
    </Wrapper>
  );
}

PhotoEntry.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
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
  font-size: 1.3rem;
  align-items: center;
`;

const LocationIcon = styled(ImLocation2)`
  color: white;
  margin-right: 0.5rem;
`;

const LocationContent = styled.span`
  color: white;
`;

const Tags = styled.span`
  position: absolute;
  bottom: 0.2rem;
  left: 0;
  color: white;
  font-size: 1.3rem;
`;

export default PhotoEntry;
