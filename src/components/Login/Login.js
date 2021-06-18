import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { store } from "../../Context/Store.js";
import { RefreshLoginToken } from "../../helper/RefreshLoginToken/RefreshLoginToken.js";

const clientId = "1013207474380-hpaso5ne13qbq5pngmd562h3tbrot5ic.apps.googleusercontent.com";

function Login() {
  const auth = useContext(store);
  const { dispatch } = auth;

  const onSuccess = (res) => {
    sessionStorage.setItem("givenName", res.profileObj.givenName);
    sessionStorage.setItem("token", res.tokenId);
    sessionStorage.setItem("user", JSON.stringify(res.profileObj));
    sessionStorage.setItem("accessToken", res.accessToken);
    dispatch({ type: "LOGIN" });

    RefreshLoginToken(res);
  };

  const onLogoutSuccess = (res) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("givenName");
    sessionStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    cookiePolicy: "single_host_origin",
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId,
  });

  return (
    <>
      {auth.state.loggedIn ? (
        <Button primary onClick={signOut} content="Logga ut"></Button>
      ) : (
        <Button primary onClick={signIn} content="Logga in med Google"></Button>
      )}
    </>
  );
}

export default Login;
