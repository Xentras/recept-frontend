import { checkGoogleLoggin } from "../../api/api.js";

const CheckLoggedIn = async () => {
  if (sessionStorage.getItem("token") === null) {
    return false;
  } else {
    return await checkGoogleLoggin()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
};

export default CheckLoggedIn;
