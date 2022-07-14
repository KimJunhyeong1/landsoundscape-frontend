import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsSearch } from "react-icons/bs";

import PhotoEntry from "../../PhotoEntry";

function SearchView({ photos, onInputChange, onPhotoClick }) {
  return (
    <>
      <SearchBarWrapper>
        <SearchBar
          type="text"
          placeholder="Search using tags related to photos."
          onChange={onInputChange}
        />
        <SearchIcon />
      </SearchBarWrapper>
      <PhotosWrapper>
        {photos?.map(photo => (
          <Link key={photo._id} to={`/${photo._id}`} onClick={onPhotoClick}>
            <PhotoEntry {...photo} />
          </Link>
        ))}
      </PhotosWrapper>
    </>
  );
}

SearchView.propTypes = {
  photos: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPhotoClick: PropTypes.func.isRequired,
};

const SearchBarWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  border: 0.3rem solid #265d6e;
  border-radius: 40px;
  justify-content: space-around;
  align-items: center;
  padding: 0.3rem 2rem;
`;

const SearchBar = styled.input`
  width: 20rem;
  height: 1.8rem;
  border: 0px solid white;

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 768px) {
    width: 30rem;
  }
`;

const SearchIcon = styled(BsSearch)`
  width: 1.6rem;
  height: 1.6rem;
  color: #265d6e;
`;

const PhotosWrapper = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (min-width: 768px) {
    width: 100%;
  }
`;

export default SearchView;
