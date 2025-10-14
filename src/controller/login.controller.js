// import jwt from "jsonwebtoken";
// import User from "../model/collegeData.model.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";

// /*
//  **********************************
//  * @REGISTER_USER
//  **********************************
//  */
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, username, password, role, collegeName, grade } = req.body;

//     if ([name, username, password, role].some((field) => !field || field.trim() === "")) {
//         throw new ApiError(400, "Name, username, password, and role are required");
//     }

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//         throw new ApiError(409, "Username already exists. Please choose another one.");
//     }

//     const user = await User.create({ name, username, password, role, collegeName, grade });

//     if (!user) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     const createdUser = await User.findById(user._id).select("-password");
//     return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
// });

// /*
//  **********************************
//  * @LOGIN_USER
//  **********************************
//  */
// const loginUser = asyncHandler(async (req, res) => {
//     const { username, password, role } = req.body;

//     if (!username || !password || !role) {
//         throw new ApiError(400, "Username, password, and role are all required");
//     }

//     const user = await User.findOne({ username });
//     if (!user) {
//         throw new ApiError(404, `User with username '${username}' not found`);
//     }

//     const isPasswordMatched = await user.matchPassword(password);
//     if (!isPasswordMatched) {
//         throw new ApiError(401, "Invalid credentials");
//     }

//     if (user.role !== role) {
//         throw new ApiError(401, `Access denied. User is not registered as a '${role}'.`);
//     }

//     const token = jwt.sign(
//         { _id: user._id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRY || "1d" }
//     );

//     const loggedInUser = {
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         role: user.role,
//         collegeName: user.collegeName,
//     };

//     return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"));
// });

// /*
//  **********************************
//  * @LOGOUT_USER
//  **********************************
//  */
// const logoutUser = asyncHandler(async (req, res) => {
//     return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
// });

// /*
//  **********************************
//  * @GET_STUDENTS_DATA (URL-Based Filtering)
//  **********************************
//  */
// const getStudentsData = asyncHandler(async (req, res) => {
//     const { role, collegeName, username } = req.query;
//     let query = {};

//     if (!role) {
//         throw new ApiError(400, "Role is required to fetch data.");
//     }

//     switch (role) {
//         case 'student':
//             if (!username) throw new ApiError(400, "Username is required for student role.");
//             query = { role: 'student', username: username };
//             break;

//         case 'admin':
//             if (!collegeName) throw new ApiError(400, "College name is required for admin role.");
//             query = { role: 'student', collegeName: collegeName };
//             break;

//         case 'super_admin':
//             query = { role: 'student' };
//             break;

//         default:
//             throw new ApiError(400, "Invalid user role specified.");
//     }

//     const students = await User.find(query).select("-password");

//     if (!students) {
//         throw new ApiError(404, "No student data found for the specified criteria.");
//     }

//     return res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
// });

// /*
//  **********************************
//  * @UPDATE_STUDENT_GRADE (INSECURE)
//  **********************************
//  */
// const updateStudentGrade = asyncHandler(async (req, res) => {
//     const { grade } = req.body;
//     const studentId = req.params.id;

//     // WARNING: No authorization. Anyone can call this endpoint.
//     if (!grade || typeof grade !== 'string' || grade.trim() === '') {
//         throw new ApiError(400, "A valid grade is required.");
//     }

//     const updatedStudent = await User.findByIdAndUpdate(
//         studentId,
//         { $set: { grade: grade.trim() } },
//         { new: true, runValidators: true }
//     ).select("-password");

//     if (!updatedStudent) {
//         throw new ApiError(404, "Student not found with the provided ID.");
//     }

//     return res.status(200).json(new ApiResponse(200, updatedStudent, "Student grade updated successfully"));
// });

// // Export all controllers
// export {
//     registerUser,
//     loginUser,
//     logoutUser,
//     getStudentsData,
//     updateStudentGrade
// };

//++++++++++++++++++++++++++++++++==NEW++++++++++++++++++++++

// import jwt from "jsonwebtoken";
// import User from "../model/collegeData.model.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";

// /*
//  **********************************
//  * @REGISTER_USER
//  **********************************
//  */
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, username, password, role, collegeName, grade } = req.body;

//     if ([name, username, password, role].some((field) => !field || field.trim() === "")) {
//         throw new ApiError(400, "Name, username, password, and role are required");
//     }

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//         throw new ApiError(409, "Username already exists. Please choose another one.");
//     }

//     const user = await User.create({ name, username, password, role, collegeName, grade });

//     if (!user) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     const createdUser = await User.findById(user._id).select("-password");
//     return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
// });

// /*
//  **********************************
//  * @LOGIN_USER
//  **********************************
//  */
// const loginUser = asyncHandler(async (req, res) => {
//     const { username, password, role } = req.body;

//     if (!username || !password || !role) {
//         throw new ApiError(400, "Username, password, and role are all required");
//     }

//     const user = await User.findOne({ username });
//     if (!user) {
//         throw new ApiError(404, `User with username '${username}' not found`);
//     }

//     const isPasswordMatched = await user.matchPassword(password);
//     if (!isPasswordMatched) {
//         throw new ApiError(401, "Invalid credentials");
//     }

//     if (user.role !== role) {
//         throw new ApiError(401, `Access denied. User is not registered as a '${role}'.`);
//     }

//     const token = jwt.sign(
//         { _id: user._id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRY || "1d" }
//     );

//     const loggedInUser = {
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         role: user.role,
//         collegeName: user.collegeName,
//     };

//     return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"));
// });

// /*
//  **********************************
//  * @LOGOUT_USER
//  **********************************
//  */
// const logoutUser = asyncHandler(async (req, res) => {
//     return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
// });

// /*
//  **********************************
//  * @GET_STUDENTS_DATA (For lists of students)
//  **********************************
//  */
// const getStudentsData = asyncHandler(async (req, res) => {
//     const { role, collegeName, username } = req.query;
//     let query = {};

//     if (!role) {
//         throw new ApiError(400, "Role is required to fetch data.");
//     }

//     switch (role) {
//         case 'student':
//             if (!username) throw new ApiError(400, "Username is required for student role.");
//             query = { role: 'student', username: username };
//             break;

//         case 'admin':
//             if (!collegeName) throw new ApiError(400, "College name is required for admin role.");
//             query = { role: 'student', collegeName: collegeName };
//             break;

//         case 'super_admin':
//             query = { role: 'student' };
//             break;

//         default:
//             throw new ApiError(400, "Invalid user role specified.");
//     }

//     const students = await User.find(query).select("-password");

//     if (!students) {
//         throw new ApiError(404, "No student data found for the specified criteria.");
//     }

//     return res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
// });

// /*
//  **********************************
//  * @GET_STUDENT_BY_ID (NEW FUNCTION)
//  * @description Fetches a single student by their unique ID.
//  **********************************
//  */
// const getStudentById = asyncHandler(async (req, res) => {
//     const studentId = req.params.id;

//     if (!studentId) {
//         throw new ApiError(400, "Student ID is required.");
//     }

//     const student = await User.findById(studentId).select("-password");

//     if (!student) {
//         throw new ApiError(404, "Student not found with the provided ID.");
//     }

//     return res.status(200).json(new ApiResponse(200, student, "Student profile retrieved successfully"));
// });

// /*
//  **********************************
//  * @UPDATE_STUDENT_PROFILE (IMPROVED FUNCTION)
//  * @description Updates a student's profile information securely.
//  **********************************
//  */
// const updateStudentProfile = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     const studentId = req.params.id;

//     const student = await User.findById(studentId);

//     if (!student) {
//         throw new ApiError(404, "Student not found.");
//     }

//     // Update fields if they were provided in the request
//     if (name) student.name = name;
//     if (email) student.email = email;
//     if (password) {
//         // If a new password is provided, the 'pre-save' hook in your model will hash it automatically
//         student.password = password;
//     }

//     // Save the updated student. This will trigger the password hashing middleware.
//     await student.save();

//     const updatedStudent = await User.findById(studentId).select("-password");

//     return res.status(200).json(new ApiResponse(200, updatedStudent, "Profile updated successfully"));
// });

// // Export all controllers
// export {
//     registerUser,
//     loginUser,
//     logoutUser,
//     getStudentsData,
//     getStudentById,         // <-- Export new function
//     updateStudentProfile    // <-- Export improved function
// };

// ====================WITH NEW DATA & ACTIVATION================

// import jwt from "jsonwebtoken";
// import User from "../model/collegeData.model.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";

// /*
//  **********************************
//  * @REGISTER_USER
//  * Handles the creation of a new user with all fields from the model.
//  **********************************
//  */
// const registerUser = asyncHandler(async (req, res) => {
//     // Destructure all fields from the request body
//     const { name, username, password, role, collegeName, grade, email, roll, year, course } = req.body;

//     // Validate essential fields
//     if ([name, username, password, role].some((field) => !field || String(field).trim() === "")) {
//         throw new ApiError(400, "Name, username, password, and role are required");
//     }

//     // Check if a user with the same username or email already exists to prevent duplicates
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//         throw new ApiError(409, "A user with this username or email already exists.");
//     }

//     // Create the new user in the database
//     const user = await User.create({ name, username, password, role, collegeName, grade, email, roll, year, course });

//     if (!user) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     // Respond with the newly created user's data (excluding the password)
//     const createdUser = await User.findById(user._id).select("-password");
//     return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
// });

// /*
//  **********************************
//  * @LOGIN_USER
//  * Authenticates a user and returns a JWT if the account is 'Active'.
//  **********************************
//  */
// const loginUser = asyncHandler(async (req, res) => {
//     const { username, password, role } = req.body;

//     if (!username || !password || !role) {
//         throw new ApiError(400, "Username, password, and role are all required");
//     }

//     // Find the user by their username
//     const user = await User.findOne({ username });
//     if (!user) {
//         throw new ApiError(404, `User with username '${username}' not found`);
//     }

//     // CRITICAL: Security check to ensure the user's account is active
//     if (user.status !== 'Active') {
//         throw new ApiError(403, "Your account is inactive. Please contact an administrator.");
//     }

//     // Verify the password
//     const isPasswordMatched = await user.matchPassword(password);
//     if (!isPasswordMatched) {
//         throw new ApiError(401, "Invalid credentials");
//     }

//     // Verify the role matches the one they are trying to log in as
//     if (user.role !== role) {
//         throw new ApiError(401, `Access denied. User is not registered as a '${role}'.`);
//     }

//     // If all checks pass, create a secure JSON Web Token
//     const token = jwt.sign(
//         { _id: user._id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRY || "1d" }
//     );

//     // Prepare the user object to be sent in the response
//     const loggedInUser = {
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         role: user.role,
//         collegeName: user.collegeName,
//     };

//     return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"));
// });

// /*
//  **********************************
//  * @LOGOUT_USER
//  * A placeholder for logout logic.
//  **********************************
//  */
// const logoutUser = asyncHandler(async (req, res) => {
//     return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
// });

// /*
//  **********************************
//  * @GET_STUDENTS_DATA
//  * Fetches a list of students based on the requester's role.
//  **********************************
//  */
// const getStudentsData = asyncHandler(async (req, res) => {
//     const { role, collegeName, username } = req.query;
//     let query = {};

//     if (!role) throw new ApiError(400, "Role is required to fetch data.");

//     // Build the query based on the role
//     switch (role) {
//         case 'student':
//             if (!username) throw new ApiError(400, "Username is required for student role.");
//             query = { role: 'student', username: username };
//             break;
//         case 'admin':
//             if (!collegeName) throw new ApiError(400, "College name is required for admin role.");
//             query = { role: 'student', collegeName: collegeName };
//             break;
//         case 'super_admin':
//             query = { role: 'student' };
//             break;
//         default:
//             throw new ApiError(400, "Invalid user role specified.");
//     }

//     const students = await User.find(query).select("-password");
//     return res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
// });

// /*
//  **********************************
//  * @GET_STUDENT_BY_ID
//  * Fetches a single student's profile by their unique MongoDB ID.
//  **********************************
//  */
// const getStudentById = asyncHandler(async (req, res) => {
//     const student = await User.findById(req.params.id).select("-password");
//     if (!student) {
//         throw new ApiError(404, "Student not found.");
//     }
//     return res.status(200).json(new ApiResponse(200, student, "Student profile retrieved successfully"));
// });

// /*
//  **********************************
//  * @UPDATE_STUDENT_PROFILE
//  * Allows a student to update their own name, email, and password.
//  **********************************
//  */
// const updateStudentProfile = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     const student = await User.findById(req.params.id);

//     if (!student) {
//         throw new ApiError(404, "Student not found.");
//     }

//     // Update fields that were provided
//     if (name) student.name = name;
//     if (email) student.email = email;
//     if (password) student.password = password; // The 'pre-save' hook will hash this

//     await student.save();
//     const updatedStudent = await User.findById(req.params.id).select("-password");
//     return res.status(200).json(new ApiResponse(200, updatedStudent, "Profile updated successfully"));
// });

// /*
//  **********************************
//  * @TOGGLE_STUDENT_STATUS
//  * Allows an admin to change a student's status between 'Active' and 'Inactive'.
//  **********************************
//  */
// const toggleStudentStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;

//     if (!status || !['Active', 'Inactive'].includes(status)) {
//         throw new ApiError(400, "A valid status ('Active' or 'Inactive') is required.");
//     }

//     const updatedStudent = await User.findByIdAndUpdate(
//         req.params.id,
//         { $set: { status } },
//         { new: true }
//     ).select("-password");

//     if (!updatedStudent) {
//         throw new ApiError(404, "Student not found.");
//     }

//     return res.status(200).json(new ApiResponse(200, updatedStudent, `Student status has been updated to ${status}`));
// });

// // Export all the controller functions for use in the router
// export {
//     registerUser,
//     loginUser,
//     logoutUser,
//     getStudentsData,
//     getStudentById,
//     updateStudentProfile,
//     toggleStudentStatus
// };

//=================================NEW ROLE BASED ===============

// import User from "../model/collegeData.model.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";
// // Assuming you will use JWT for login tokens
// import jwt from "jsonwebtoken";

// /*
//  **********************************
//  * @REGISTER_USER (For Admins to add Students)
//  * Role is hardcoded to 'student'.
//  **********************************
//  */
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, username, password, collegeName, grade, email, roll, year, course } = req.body;

//     // An admin should create a student, so we enforce the role.
//     const role = 'student';

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//         throw new ApiError(409, "A student with this username or email already exists.");
//     }

//     const user = await User.create({ name, username, password, role, collegeName, grade, email, roll, year, course });
//     const createdUser = await User.findById(user._id).select("-password");
//     return res.status(201).json(new ApiResponse(201, createdUser, "Student account created successfully"));
// });

// /*
//  **********************************
//  * @CREATE_ADMIN (For Super Admins)
//  * Role is hardcoded to 'admin'.
//  **********************************
//  */
// const createAdmin = asyncHandler(async (req, res) => {
//     const { name, username, password, email, collegeName } = req.body;
//     const role = 'admin'; // Super Admins create Admins

//     if (!collegeName) {
//         throw new ApiError(400, "College name is required for an Admin account.");
//     }

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//         throw new ApiError(409, "An admin with this username or email already exists.");
//     }

//     const admin = await User.create({ name, username, password, role, email, collegeName });
//     const createdAdmin = await User.findById(admin._id).select("-password");
//     return res.status(201).json(new ApiResponse(201, createdAdmin, "Admin account created successfully"));
// });

// /*
//  **********************************
//  * @LOGIN_USER (Modified)
//  * Now checks for account status before allowing login.
//  **********************************
//  */
// const loginUser = asyncHandler(async (req, res) => {
//     const { username, password, role } = req.body;
//     const user = await User.findOne({ username });

//     if (!user || !(await user.matchPassword(password))) {
//         throw new ApiError(401, "Invalid username or password");
//     }

//     // CRITICAL SECURITY CHECK: Is the account active?
//     if (user.status !== 'Active') {
//         throw new ApiError(403, "Your account is inactive. Please contact an administrator.");
//     }

//     if (user.role !== role) {
//         throw new ApiError(401, `Access denied. You are not registered as a '${role}'.`);
//     }

//     const token = jwt.sign(
//         { _id: user._id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRY || "1d" }
//     );

//     const loggedInUser = { _id: user._id, name: user.name, username: user.username, role: user.role, collegeName: user.collegeName };
//     return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "Login successful"));
// });

// /*
//  **********************************
//  * @GET_USERS (Replaces getStudentsData)
//  * Fetches users based on the requester's permissions.
//  **********************************
//  */
// const getUsers = asyncHandler(async (req, res) => {
//     // In a real app with auth middleware, you would get this from the decoded JWT token (e.g., req.user.role)
//     const { role, collegeName } = req.query;
//     let query = {};

//     if (role === 'super_admin') {
//         // Super admin can see ALL admins and students
//         query = { role: { $in: ['admin', 'student'] } };
//     } else if (role === 'admin') {
//         // An Admin can only see students from THEIR own college
//         query = { role: 'student', collegeName: collegeName };
//     } else {
//         throw new ApiError(403, "You do not have permission to view this data.");
//     }

//     const users = await User.find(query).select("-password");
//     return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
// });

// /*
//  **********************************
//  * @TOGGLE_USER_STATUS
//  * Allows Admins/Super Admins to activate or deactivate an account.
//  **********************************
//  */
// const toggleUserStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     const userId = req.params.id;

//     if (!['Active', 'Inactive'].includes(status)) {
//         throw new ApiError(400, "Invalid status. Must be 'Active' or 'Inactive'.");
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true }).select("-password");

//     if (!updatedUser) {
//         throw new ApiError(404, "User not found.");
//     }
//     return res.status(200).json(new ApiResponse(200, updatedUser, `User status updated to ${status}`));
// });

// /*
//  **********************************
//  * @UPDATE_PROFILE (Replaces updateStudentGrade)
//  * A single, secure function for ANY user to update their own profile.
//  **********************************
//  */
// const updateProfile = asyncHandler(async (req, res) => {
//     // In a real app, you would verify that the logged-in user's ID from the JWT
//     // matches req.params.id, preventing one user from changing another's profile.
//     const userId = req.params.id;
//     const { name, email, password } = req.body;

//     const user = await User.findById(userId);
//     if (!user) throw new ApiError(404, "User not found");

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (password) {
//         // The pre-save hook in your model will automatically hash the new password
//         user.password = password;
//     }

//     await user.save();
//     const updatedUser = await User.findById(userId).select("-password");
//     return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully."));
// });

// // Export all the new and modified functions
// export {
//     registerUser,
//     createAdmin,
//     loginUser,
//     getUsers,
//     toggleUserStatus,
//     updateProfile,
// };

//+++++++++++++++++++++ FEW CORRECTIONS++++++++++++++++++
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
    email: user.email
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
