import User from "../model/collegeData.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    password,
    collegeName,
    grade,
    email,
    roll,
    year,
    course,
  } = req.body;
  const role = "student";
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(
      409,
      "A student with this username or email already exists."
    );
  }
  const user = await User.create({
    name,
    username,
    password,
    role,
    collegeName,
    grade,
    email,
    roll,
    year,
    course,
  });
  const createdUser = await User.findById(user._id).select("-password");
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, "Student account created successfully")
    );
});

const createAdmin = asyncHandler(async (req, res) => {
  const { name, username, password, email, collegeName } = req.body;
  const role = "admin";
  if (!collegeName) {
    throw new ApiError(400, "College name is required for an Admin account.");
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(
      409,
      "An admin with this username or email already exists."
    );
  }
  const admin = await User.create({
    name,
    username,
    password,
    role,
    email,
    collegeName,
  });
  const createdAdmin = await User.findById(admin._id).select("-password");
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdAdmin, "Admin account created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(
      500,
      "Internal Server Error: JWT Secret not configured."
    );
  }
  const { username, password, role } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid username or password");
  }
  if (user.status !== "Active") {
    throw new ApiError(
      403,
      "Your account is inactive. Please contact an administrator."
    );
  }
  if (user.role !== role) {
    throw new ApiError(
      401,
      `Access denied. You are not registered as a '${role}'.`
    );
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const loggedInUser = {
    id: user._id,
    _id: user._id,
    name: user.name,
    username: user.username,
    role: user.role,
    collegeName: user.collegeName,
    email: user.email,
  };
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: loggedInUser, token }, "Login successful")
    );
});

const getUsers = asyncHandler(async (req, res) => {
  const { role, collegeName } = req.query;
  let query = {};
  if (role === "super_admin") {
    query = { role: { $in: ["admin", "student"] } };
  } else if (role === "admin") {
    query = { role: "student" };
  } else {
    throw new ApiError(403, "You do not have permission to view this data.");
  }
  const users = await User.find(query).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    throw new ApiError(400, "User ID is required.");
  }
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found with the provided ID.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

const toggleUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const userId = req.params.id;
  if (!["Active", "Inactive"].includes(status)) {
    throw new ApiError(400, "Invalid status. Must be 'Active' or 'Inactive'.");
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true }
  ).select("-password");
  if (!updatedUser) throw new ApiError(404, "User not found.");
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, `User status updated to ${status}`)
    );
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  await user.save();
  const updatedUser = await User.findById(userId).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully."));
});

export {
  registerUser,
  createAdmin,
  loginUser,
  getUsers,
  getUserById,
  toggleUserStatus,
  updateProfile,
};
