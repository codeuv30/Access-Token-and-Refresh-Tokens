import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import authUtils from "../utils/auth.utils.js";

const registerService = async (data) => {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const isExisting = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (isExisting) {
      throw new Error('Incorrect email or password');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const accessToken = authUtils.generateAccessToken({ userId: user._id });
    const refreshToken = authUtils.generateRefreshToken({ userId: user._id });

    return {
        accessToken,
        refreshToken,
        user
    }
  } catch (error) {
    throw error;
  }
};

const loginService = async (data) => {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const user = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      throw new Error('Incorrect email or password');
    }

    const accessToken = authUtils.generateAccessToken({ userId: user._id });
    const refreshToken = authUtils.generateRefreshToken({ userId: user._id });

    return {
        accessToken,
        refreshToken,
        user
    }
  } catch (error) {
    throw error;
  }
};

export default {
    registerService,
    loginService
}