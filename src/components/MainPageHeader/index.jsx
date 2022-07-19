import styled from "styled-components";
import PropTypes from "prop-types";
import { ImLocation2 } from "react-icons/im";

function MainPageHeader({ creator, city, country }) {
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>{creator.toUpperCase()}`S PHOTOS</HeaderContent>
        <Location>
          <LocationIcon />
          <HeaderContent>
            {city.toUpperCase()} - {country.toUpperCase()}
          </HeaderContent>
        </Location>
      </HeaderWrapper>
    </>
  );
}

export default MainPageHeader;

MainPageHeader.propTypes = {
  creator: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1.2rem 1.2rem;
  position: absolute;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LocationIcon = styled(ImLocation2)`
  font-size: 1.6rem;
  color: white;
`;

const HeaderContent = styled.span`
  font-weight: 200;
  font-style: normal;
  font-size: 1.1rem;
  color: white;
`;
