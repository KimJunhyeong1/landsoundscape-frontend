import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PhotoEntry from "../PhotoEntry";

function MyPhotoList({ list }) {
  return list.map(photo => (
    <Link key={photo._id} to={`/${photo._id}`}>
      <PhotoEntry {...photo} size="large" />
    </Link>
  ));
}

MyPhotoList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default MyPhotoList;
