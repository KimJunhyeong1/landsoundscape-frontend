import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import PhotoEntry from "../PhotoEntry";

function MyPhotoList({ list }) {
  return (
    <Wrapper>
      {list.map(photo => (
        <Link key={photo._id} to={`/${photo._id}`}>
          <PhotoEntry {...photo} size="large" />
        </Link>
      ))}
    </Wrapper>
  );
}

MyPhotoList.propTypes = {
  list: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (min-width: 768px) {
  }
`;

export default MyPhotoList;
