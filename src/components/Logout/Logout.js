import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "1013207474380-hpaso5ne13qbq5pngmd562h3tbrot5ic.apps.googleusercontent.com";

function Logut() {
  const onSuccess = () => {
    sessionStorage.removeItem("token");
  };

  const onFailure = (res) => {
    console.log("Something went wrong: ", res);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleLogout
        clientId={clientId}
        buttonText="Logga ut"
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Logut;
