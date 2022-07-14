import styled from "styled-components";
import PropTypes from "prop-types";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ImLocation2 } from "react-icons/im";

function PhotoEntry({ imageUrl, country, city, tags, size }) {
  return (
    <LazyLoadComponent>
      <Wrapper>
        <PhotoView src={imageUrl} size={size} effect="blur" />
        <Location>
          <LocationIcon />
          <LocationContent>
            {city} - {country}
          </LocationContent>
        </Location>
        <Tags>{tags.join(", ")}</Tags>
      </Wrapper>
    </LazyLoadComponent>
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
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    width: 20rem;
    margin: 1rem;

    :hover {
      transition: all 0.5s linear;
    }
  }
`;

const PhotoView = styled(LazyLoadImage)`
  width: ${props => (props.size === "large" ? "100vw" : "90vw")};
  height: 20rem;
  object-fit: cover;

  :hover {
    transition: all 0.5s linear !important;
    transform: scale(1.2);
  }

  @media only screen and (min-width: 768px) {
    width: 20rem;
  }
`;

const Location = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  align-items: center;

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
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
  bottom: 0.3rem;
  left: 0.3rem;
  color: white;
  font-size: 1.3rem;

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

export default PhotoEntry;
