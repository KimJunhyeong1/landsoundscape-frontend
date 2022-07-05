import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

import useModal from "../../hooks/useModal";
import { login } from "../../api";
import loginState from "../../recoil/auth";
import LoginView from "../ViewAssetComponents/LoginView";

function Login() {
  const setLoginState = useSetRecoilState(loginState);
  const loginMutation = useMutation(login);
  const { hideModal } = useModal();

  const handleLogin = async credentialResponse => {
    const profileObj = jwtDecode(credentialResponse.credential);

    const { name, email } = profileObj;
    loginMutation.mutate(
      { name, email },
      {
        onSuccess: response => {
          setLoginState(response);
          localStorage.setItem("loginData", JSON.stringify(response));

          hideModal();
        },
      },
    );
  };

  const LoginProps = {
    onLoginButtonClick: handleLogin,
  };

  return <LoginView {...LoginProps} />;
}

export default Login;
