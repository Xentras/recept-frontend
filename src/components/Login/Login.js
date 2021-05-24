import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "1013207474380-hpaso5ne13qbq5pngmd562h3tbrot5ic.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    sessionStorage.setItem("token", res.tokenId)
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
