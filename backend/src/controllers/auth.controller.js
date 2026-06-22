import authUtils from "../utils/auth.utils.js";
import authService from "../services/auth.service.js";

const registerController = async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.registerService(req.body);

  authUtils.sendCookie({
    res,
    cookieName: "accessToken",
    cookieValue: accessToken,
    maxAge: 10 * 60 * 1000, // 10m
  });

  authUtils.sendCookie({
    res,
    cookieName: "refreshToken",
    cookieValue: refreshToken,
    maxAge: 1 * 60 * 60 * 24, // 1d
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user
  });
};

const loginController = async (req, res) => {
const { accessToken, refreshToken, user } = await authService.loginService(req.body);

  authUtils.sendCookie({
    res,
    cookieName: "accessToken",
    cookieValue: accessToken,
    maxAge: 10 * 60 * 1000, // 10m
  });

  authUtils.sendCookie({
    res,
    cookieName: "refreshToken",
    cookieValue: refreshToken,
    maxAge: 1 * 60 * 60 * 24, // 1d
  });

  return res.status(201).json({
    success: true,
    message: "User logged in successfully",
    user
  });
};

const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Successfully fetched user details",
    user
  });
}

const getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh Token is required"
    })
  }

  const accessToken = await authService.getAccessToken(refreshToken);

  authUtils.sendCookie({
    res,
    cookieName: "accessToken",
    cookieValue: accessToken,
    maxAge: 5 * 60 * 1000 // 5m
  });

  return res.status(200).json({
    success: false,
    message: "Access token generated"
  });
}

export default {
  registerController,
  loginController,
  getMe,
  getAccessToken
};
