import styled from "styled-components";
import PropTypes from "prop-types";
import { ImLocation2 } from "react-icons/im";

function MainPageHeader({ creator, city, country }) {
  return (
    <HeaderWrapper>
      <HeaderContent>{creator}</HeaderContent>
      <Location>
        <LocationIcon />
        <HeaderContent>
          {city} - {country}
        </HeaderContent>
      </Location>
    </HeaderWrapper>
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
  width: 99%;
  padding: 0 0.1rem;
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
`;

const LocationIcon = styled(ImLocation2)`
  font-size: 2rem;
  color: white;
`;

const HeaderContent = styled.h2`
  color: white;
`;
