export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const loginUserUrl = backendUrl + "/auth/google/login"
export const callbackUserUrl = backendUrl + "/auth/google/callback"
export const getUserProfileUrl = backendUrl + "/user/profile"

export const gettAllMatchesUrl = backendUrl + "/user/all-matches";
export const getCurrentMatchUrl = backendUrl + "/user/get-match";
export const deleteCurrentMatchUrl = backendUrl + "/user/delete-match";
export const predictMatchUrl = backendUrl + "/user/predict-match";
export const savePredictionhUrl = backendUrl + "/user/save-prediction";
export const updateCurrentMatchUrl = backendUrl + "/user/update-prediction";
