import { registerAs } from "@nestjs/config";

// params are case sensitive here for oauth
export default registerAs("googleOAuth", () => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}))