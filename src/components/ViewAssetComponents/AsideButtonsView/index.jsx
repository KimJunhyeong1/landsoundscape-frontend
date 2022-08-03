import styled from "styled-components";
import PropTypes from "prop-types";
import { BsPerson } from "react-icons/bs";
import { RiFileUploadLine } from "react-icons/ri";
import { BiBookBookmark, BiSearchAlt2 } from "react-icons/bi";

function AsideButtonsView({
  onProfileIconClick,
  onUploadIconClick,
  onBookmarkIconClick,
  onSearchIconClick,
}) {
  return (
    <Wrapper>
      <ProfileIcon onClick={onProfileIconClick} />
      <UploadIcon onClick={onUploadIconClick} />
      <BookmarkIcon onClick={onBookmarkIconClick} />
      <SearchIcon data-testid="search_icon" onClick={onSearchIconClick} />
    </Wrapper>
  );
}

AsideButtonsView.propTypes = {
  onProfileIconClick: PropTypes.func.isRequired,
  onUploadIconClick: PropTypes.func.isRequired,
  onBookmarkIconClick: PropTypes.func.isRequired,
  onSearchIconClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  top: 9rem;
  right: 1rem;
  height: 17rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 3rem;
  color: white;
  cursor: pointer;
`;

const ProfileIcon = styled(Icon.withComponent(BsPerson))``;
const UploadIcon = styled(Icon.withComponent(RiFileUploadLine))``;
const BookmarkIcon = styled(Icon.withComponent(BiBookBookmark))``;
const SearchIcon = styled(Icon.withComponent(BiSearchAlt2))``;

export default AsideButtonsView;
