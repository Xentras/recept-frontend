export const RefreshLoginToken = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        sessionStorage.setItem("token", newAuthRes.id_token)
        sessionStorage.setItem("accessToken", newAuthRes.accessToken)

        setTimeout(refreshToken, refreshTiming)
    }

    setTimeout(refreshToken, refreshTiming)
}