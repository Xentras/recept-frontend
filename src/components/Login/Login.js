import React, {useContext} from "react";
import { GoogleLogin } from "react-google-login";
import { store } from "../../helper/Store/Store.js";

const clientId =
  "1013207474380-hpaso5ne13qbq5pngmd562h3tbrot5ic.apps.googleusercontent.com";

function Login() {
  const auth = useContext(store);
  const { dispatch } = auth;

  const onSuccess = (res) => {
    sessionStorage.setItem("givenName", res.profileObj.givenName)
    sessionStorage.setItem("token", res.tokenId)
    sessionStorage.setItem("user", JSON.stringify(res.profileObj))
    dispatch({ type: 'LOGIN' })
  };

  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Logga in med Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
