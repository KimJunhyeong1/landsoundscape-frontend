import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import PhotoEntry from "../PhotoEntry";

function CityPhotoList({ groupedCityPhotos }) {
  return groupedCityPhotos.map(element => {
    const [city, photos] = element;
    return (
      <CityWrapper key={city}>
        <CountryName>{city}</CountryName>
        <Wrapper>
          {photos.map(photo => (
            <Link key={photo._id} to={`/${photo._id}`}>
              <PhotoEntry {...photo} size="large" />
            </Link>
          ))}
        </Wrapper>
      </CityWrapper>
    );
  });
}

CityPhotoList.propTypes = {
  groupedCityPhotos: PropTypes.array.isRequired,
};

const CityWrapper = styled.div`
  width: 100%;

  @media only screen and (min-width: 768px) {
    padding: 1rem 10rem;
  }
`;

const CountryName = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
  margin-top: 3rem;
  margin-left: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (min-width: 768px) {
    width: 90%;
  }
`;

export default CityPhotoList;
