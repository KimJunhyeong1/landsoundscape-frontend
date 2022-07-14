import styled from "styled-components";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { getMyPhotos } from "../../api";
import MyPhotoList from "../MyPhotoList";
import loginState from "../../recoil/auth";

function MyPageInfo() {
  const userData = useRecoilValue(loginState);
  const { data } = useQuery(
    ["getMyPhotos", userData?._id],
    () => getMyPhotos(userData?._id),
    { refetchOnWindowFocus: false },
  );

  return (
    <>
      <UserName>{`${userData.name}'s Photos`}</UserName>
      <MyPhotoList list={data.myPhotos} />
    </>
  );
}

const UserName = styled.span`
  align-self: flex-start;
  margin-left: 3rem;
  margin-top: 6rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 800;
  font-size: 1.6rem;
`;

export default MyPageInfo;
