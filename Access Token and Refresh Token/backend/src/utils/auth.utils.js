import jwt from "jsonwebtoken";

const generateAccessToken = ({ userId }) => {
    return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: "10m" });
};

const generateRefreshToken = ({ userId }) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
};

const sendCookie = ({ res, cookieName, cookieValue, maxAge }) => {
    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge
    });
}

export default {
    generateAccessToken,
    generateRefreshToken,
    sendCookie
}