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


router.route("/login").post(loginUser);


// An Admin uses this to create a new Student account
router.route("/register").post(registerUser); 

// A Super Admin uses this to create a new Admin account
router.route("/users/admins").post(createAdmin);


// Super Admin gets all users; Admin gets their college's students.
router.route("/users").get(getUsers);

// Admin or Super Admin can activate or inactivate ANY user's account
router.route("/users/:id/status").patch(toggleUserStatus);


// Student Dashboard to fetch its own profile data.
router.route("/users/:id").get(getUserById);

// to update their own profile.
router.route("/users/:id/profile").put(updateProfile);


export default router;

