import jwt from "jsonwebtoken";
import User from "../model/collegeData.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/*
 **********************************
 * @REGISTER_USER
 **********************************
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password, role, collegeName, grade } = req.body;

    if ([name, username, password, role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "Name, username, password, and role are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(409, "Username already exists. Please choose another one.");
    }

    const user = await User.create({ name, username, password, role, collegeName, grade });

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const createdUser = await User.findById(user._id).select("-password");
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

/*
 **********************************
 * @LOGIN_USER
 **********************************
 */
const loginUser = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        throw new ApiError(400, "Username, password, and role are all required");
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, `User with username '${username}' not found`);
    }

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (user.role !== role) {
        throw new ApiError(401, `Access denied. User is not registered as a '${role}'.`);
    }

    const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || "1d" }
    );

    const loggedInUser = {
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        collegeName: user.collegeName,
    };

    return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"));
});

/*
 **********************************
 * @LOGOUT_USER
 **********************************
 */
const logoutUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});

/*
 **********************************
 * @GET_STUDENTS_DATA (URL-Based Filtering)
 **********************************
 */
const getStudentsData = asyncHandler(async (req, res) => {
    const { role, collegeName, username } = req.query;
    let query = {};

    if (!role) {
        throw new ApiError(400, "Role is required to fetch data.");
    }

    switch (role) {
        case 'student':
            if (!username) throw new ApiError(400, "Username is required for student role.");
            query = { role: 'student', username: username };
            break;
        
        case 'admin':
            if (!collegeName) throw new ApiError(400, "College name is required for admin role.");
            query = { role: 'student', collegeName: collegeName };
            break;

        case 'super_admin':
            query = { role: 'student' };
            break;

        default:
            throw new ApiError(400, "Invalid user role specified.");
    }

    const students = await User.find(query).select("-password");

    if (!students) {
        throw new ApiError(404, "No student data found for the specified criteria.");
    }

    return res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
});

/*
 **********************************
 * @UPDATE_STUDENT_GRADE (INSECURE)
 **********************************
 */
const updateStudentGrade = asyncHandler(async (req, res) => {
    const { grade } = req.body;
    const studentId = req.params.id;

    // WARNING: No authorization. Anyone can call this endpoint.
    if (!grade || typeof grade !== 'string' || grade.trim() === '') {
        throw new ApiError(400, "A valid grade is required.");
    }

    const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { $set: { grade: grade.trim() } },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStudent) {
        throw new ApiError(404, "Student not found with the provided ID.");
    }

    return res.status(200).json(new ApiResponse(200, updatedStudent, "Student grade updated successfully"));
});

// Export all controllers
export {
    registerUser,
    loginUser,
    logoutUser,
    getStudentsData,
    updateStudentGrade
};