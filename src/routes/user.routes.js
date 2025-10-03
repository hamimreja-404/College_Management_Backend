import { Router } from 'express';
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    getStudentsData,
    updateStudentGrade 
} from '../controller/login.controller.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);


router.route('/students').get(  getStudentsData);


router.route('/students/:id').put(  updateStudentGrade);

export default router;
