// import { Router } from 'express';
// import { 
//     registerUser, 
//     loginUser, 
//     logoutUser,
//     getStudentsData,
//     updateStudentGrade 
// } from '../controller/login.controller.js';

// const router = Router();

// router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);


// router.route('/students').get(  getStudentsData);

// // --------------------Admin updates student grade-------------------
// router.route('/students/:id').put(  updateStudentGrade)

// export default router;


// =================NEW===================
// import { Router } from 'express';

// // Import your controllers
// import { 
//     registerUser, 
//     loginUser, 
//     logoutUser,
//     getStudentsData,
//     getStudentById,         // <-- Import new function
//     updateStudentProfile    // <-- Import improved function
// } from '../controller/login.controller.js';

// const router = Router();

// // --- Public Routes ---
// router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);


// // --- Protected Routes ---

// // Route for getting lists of students (no change)
// router.route('/students').get(getStudentsData);

// // --- MODIFIED ROUTES ---
// // Add the new GET route to fetch a single student by their ID
// router.route('/students/:id').get(getStudentById);

// // Update the PUT route to use the new, more secure update function
// router.route('/students/:id').put(updateStudentProfile);

// export default router;


//==========================WITH ACTIVETION=====================

// import { Router } from 'express';

// // Import all the necessary controllers, including the new one
// import { 
//     registerUser, 
//     loginUser, 
//     logoutUser,
//     getStudentsData,
//     getStudentById,
//     updateStudentProfile,
//     toggleStudentStatus // <-- Now importing the new function
// } from '../controller/login.controller.js';

// const router = Router();

// // --- Public Routes ---
// router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);


// // --- Student & Admin Routes ---
// router.route('/students').get(getStudentsData);
// router.route('/students/:id').get(getStudentById);
// router.route('/students/:id').put(updateStudentProfile);


// // --- NEW ADMIN-ONLY ROUTE ---
// // This new route connects the frontend to the toggleStudentStatus function.
// // We use PATCH because it's a partial update (only changing the status).
// router.route('/students/:id/status').patch(toggleStudentStatus);


// export default router;



//++================== ALL NEW REQWUIREMENTS================\
// import { Router } from 'express';
// import {
//     registerUser,
//     createAdmin,
//     loginUser,
//     getUsers,
//     toggleUserStatus,
//     updateProfile,
// } from '../controller/login.controller.js';
// // In a production app, you would import and use authentication middleware here
// // import { authMiddleware, isAdmin, isSuperAdmin } from '../middleware/auth.middleware.js';

// const router = Router();

// /*
//  * =================================================================
//  * --- PUBLIC ROUTES (No Authentication Needed) ---
//  * =================================================================
//  */
// router.route("/login").post(loginUser);


// /*
//  * =================================================================
//  * --- ADMIN & SUPER ADMIN ROUTES ---
//  * (These routes would be protected by authentication middleware)
//  * =================================================================
//  */

// // An Admin can create a new Student account
// router.route("/register").post(registerUser); 

// // A Super Admin can create a new Admin account
// router.route("/users/admins").post(createAdmin);

// // Get a list of users (Super Admin gets all, Admin gets their students)
// router.route("/users").get(getUsers);

// // Activate or inactivate ANY user's account
// router.route("/users/:id/status").patch(toggleUserStatus);


// /*
//  * =================================================================
//  * --- GENERAL USER ROUTES ---
//  * (For any authenticated user to manage their own profile)
//  * =================================================================
//  */

// // Any user (Student, Admin, Super Admin) can update their own profile
// router.route("/users/:id/profile").put(updateProfile);


// export default router;



//+++++++++++++++++FEW CHANGES+++++++++++++++++
// import { Router } from 'express';
// import {
//     registerUser,
//     createAdmin,
//     loginUser,
//     getUsers,
//     toggleUserStatus,
//     updateProfile,
// } from '../controller/login.controller.js';

// const router = Router();

// /*
//  * =================================================================
//  * --- PUBLIC ROUTES (No Authentication Needed) ---
//  * =================================================================
//  */
// router.route("/login").post(loginUser);


// /*
//  * =================================================================
//  * --- ADMIN & SUPER ADMIN ROUTES ---
//  * (In a real app, these would be protected by authentication middleware)
//  * =================================================================
//  */

// // An Admin uses this to create a new Student account
// router.route("/register").post(registerUser); 

// // A Super Admin uses this to create a new Admin account
// router.route("/users/admins").post(createAdmin);

// // This is the main data endpoint for dashboards.
// // Super Admin gets all users, Admin gets their college's students.
// router.route("/users").get(getUsers);

// // Admin or Super Admin can activate or inactivate ANY user's account
// router.route("/users/:id/status").patch(toggleUserStatus);


// /*
//  * =================================================================
//  * --- GENERAL USER ROUTES ---
//  * (For any authenticated user to manage their own profile)
//  * =================================================================
//  */

// // Any user (Student, Admin, or Super Admin) can update their own profile
// router.route("/users/:id/profile").put(updateProfile);


// export default router;

//++++++++++++++++==SOME CHANGES==================
import { Router } from 'express';
import {
    registerUser,
    createAdmin,
    loginUser,
    getUsers,
    getUserById,
    toggleUserStatus,
    updateProfile,
} from '../controller/login.controller.js';

const router = Router();

/*
 * =================================================================
 * --- PUBLIC ROUTES (No Authentication Needed) ---
 * =================================================================
 */
router.route("/login").post(loginUser);


/*
 * =================================================================
 * --- ADMIN & SUPER ADMIN ROUTES ---
 * (These would be protected by authentication middleware in a real app)
 * =================================================================
 */

// An Admin uses this to create a new Student account
router.route("/register").post(registerUser); 

// A Super Admin uses this to create a new Admin account
router.route("/users/admins").post(createAdmin);

// This is the main data endpoint for dashboards.
// Super Admin gets all users; Admin gets their college's students.
router.route("/users").get(getUsers);

// Admin or Super Admin can activate or inactivate ANY user's account
router.route("/users/:id/status").patch(toggleUserStatus);


/*
 * =================================================================
 * --- GENERAL USER ROUTES ---
 * =================================================================
 */

// This route allows the Student Dashboard to fetch its own profile data.
router.route("/users/:id").get(getUserById);

// This route allows any user (Student, Admin, Super Admin) to update their own profile.
router.route("/users/:id/profile").put(updateProfile);


export default router;

