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
    user: {
        name: user.name,
        email: user.email,
        id: user._id
    }
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
    user: {
        name: user.name,
        email: user.email,
        id: user._id
    }
  });
};

export default {
  registerController,
  loginController,
};
