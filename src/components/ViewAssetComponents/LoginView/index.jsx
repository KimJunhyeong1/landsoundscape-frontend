import styled from "styled-components";
import PropTypes from "prop-types";
import { GoogleLogin } from "@react-oauth/google";

function LoginView({ onLoginButtonClick }) {
  return (
    <Wrapper>
      <Description>
        Fall into the beautiful landscape and the sound of your imagination.
      </Description>
      <GoogleLogin
        onSuccess={onLoginButtonClick}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Wrapper>
  );
}

LoginView.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Description = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

export default LoginView;
