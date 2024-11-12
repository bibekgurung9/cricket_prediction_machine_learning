export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const loginUserUrl = backendUrl + "/auth/google/login"
export const callbackUserUrl = backendUrl + "/auth/google/callback"
export const getUserProfileUrl = backendUrl + "/user/profile"

export const predictMatchUrl = backendUrl + "/user/predict-winner";
