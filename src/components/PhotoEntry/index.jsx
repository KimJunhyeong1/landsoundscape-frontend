import styled from "styled-components";
import PropTypes from "prop-types";
import { ImLocation2 } from "react-icons/im";

function PhotoEntry({ imageUrl, country, city, tags, size }) {
  return (
    <Wrapper>
      <PhotoView src={imageUrl} size={size} />
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
  size: PropTypes.string,
};

const Wrapper = styled.div`
  position: relative;
  height: 20rem;
`;

const PhotoView = styled.img`
  width: ${props => (props.size === "large" ? "100vw" : "90vw")};
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
