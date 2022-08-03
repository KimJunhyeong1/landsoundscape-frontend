import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import PhotoEntry from "../PhotoEntry";
import useMyPhotos from "../../hooks/useMyPhotos";

function MyPhotoList({ userId }) {
  const { data } = useMyPhotos(userId);

  return (
    <Wrapper>
      {data.myPhotos.map(photo => (
        <Link key={photo._id} to={`/${photo._id}`}>
          <PhotoEntry {...photo} size="large" />
        </Link>
      ))}
    </Wrapper>
  );
}

MyPhotoList.propTypes = {
  userId: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (min-width: 768px) {
  }
`;

export default MyPhotoList;
