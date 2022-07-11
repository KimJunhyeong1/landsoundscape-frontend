import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import PhotoEntry from "../PhotoEntry";

function CityPhotoList({ groupedCityPhotos }) {
  return groupedCityPhotos.map(element => {
    const [city, photos] = element;
    return (
      <div key={city}>
        <CountryName>{city}</CountryName>
        {photos.map(photo => (
          <Link key={photo._id} to={`/${photo._id}`}>
            <PhotoEntry {...photo} size="large" />
          </Link>
        ))}
      </div>
    );
  });
}

CityPhotoList.propTypes = {
  groupedCityPhotos: PropTypes.array.isRequired,
};

const CountryName = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
  margin-top: 3rem;
`;

export default CityPhotoList;
