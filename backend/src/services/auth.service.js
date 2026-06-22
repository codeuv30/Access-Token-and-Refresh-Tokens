import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import authUtils from "../utils/auth.utils.js";
import jwt from "jsonwebtoken";

const registerService = async (data) => {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const isExisting = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (isExisting) {
      throw new Error("Incorrect email or password");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const accessToken = authUtils.generateAccessToken({ userId: user._id });
    const refreshToken = authUtils.generateRefreshToken({ userId: user._id });

    user.refreshToken = refreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

const loginService = async (data) => {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect email or password");
    }

    const accessToken = authUtils.generateAccessToken({ userId: user._id });
    const refreshToken = authUtils.generateRefreshToken({ userId: user._id });

    user.refreshToken = refreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

const getAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  if (!decoded) throw new Error("Unauthorized");

  const user = await User.findById(decoded.id);

  if(!user) throw new Error("Unauthorized");

  if(refreshToken !== user.refreshToken) throw new Error("Unauthorized");

  const accessToken = authUtils.generateAccessToken({ userId: user._id });

  return accessToken;
};

export default {
  registerService,
  loginService,
  getAccessToken,
};
