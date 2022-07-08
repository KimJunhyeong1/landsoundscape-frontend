import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { getUserBookmarks } from "../../api";
import useModal from "../../hooks/useModal";
import loginState from "../../recoil/auth";
import PhotoEntry from "../PhotoEntry";

function Bookmarks() {
  const userData = useRecoilValue(loginState);
  const { hideModal } = useModal();
  const { data } = useQuery(
    ["getBookmarks", userData._id],
    () => getUserBookmarks(userData._id),
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <NameTile>{userData.name}</NameTile>
      {data.bookmarks.map(bookmark => (
        <Link
          key={bookmark._id}
          to={`/${bookmark._id}`}
          onClick={() => hideModal()}
        >
          <PhotoEntry {...bookmark} />
        </Link>
      ))}
    </>
  );
}

const NameTile = styled.h3`
  font-size: 1.8rem;
  color: #265d6e;
  font-weight: 800;
`;

export default Bookmarks;
