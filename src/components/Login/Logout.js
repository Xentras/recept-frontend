import React, {useContext} from "react";
import { GoogleLogout } from "react-google-login";
import { store } from "../../helper/Store/Store.js";

const clientId =
  "1013207474380-hpaso5ne13qbq5pngmd562h3tbrot5ic.apps.googleusercontent.com";

function Logut() {
  const auth = useContext(store);
  const { dispatch } = auth;

  const onSuccess = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("givenName");
    dispatch({ type: 'LOGOUT' })
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
