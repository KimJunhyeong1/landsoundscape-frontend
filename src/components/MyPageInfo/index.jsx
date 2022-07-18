import styled from "styled-components";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { MoonLoader } from "react-spinners";

import MyPhotoList from "../MyPhotoList";
import loginState from "../../recoil/auth";
import SpinnersWrapper from "../themes/SpinnersWrapper";

function MyPageInfo() {
  const userData = useRecoilValue(loginState);

  return (
    <>
      <UserName>{`${userData.name}'s Photos`}</UserName>
      <Suspense
        fallback={
          <SpinnersWrapper>
            <MoonLoader />
          </SpinnersWrapper>
        }
      >
        <MyPhotoList userId={userData?._id} />
      </Suspense>
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
