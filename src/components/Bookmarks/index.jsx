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
      <NameTile>{userData.name}`s Pick</NameTile>
      <Wrapper>
        {data.bookmarks.map(bookmark => (
          <Link
            key={bookmark._id}
            to={`/${bookmark._id}`}
            onClick={() => hideModal()}
          >
            <PhotoEntry {...bookmark} />
          </Link>
        ))}
      </Wrapper>
    </>
  );
}

const NameTile = styled.span`
  margin-top: 3rem;
  align-self: flex-start;
  font-size: 1.5rem;
  color: #265d6e;
  font-weight: 800;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (min-width: 768px) {
    width: 100%;
  }
`;

export default Bookmarks;
