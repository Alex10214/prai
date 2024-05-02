import {Router} from "express";
import {check} from "express-validator";

import {
    register,
    logIn,

} from '../controllers/auth'

const router = Router();

router.post("/login", logIn);
router.post("/registration", [
    check('username', 'Username must not be empty').notEmpty(),
    check('password', 'Password must not be empty').notEmpty(),
    check('roleId', 'RoleId must not be empty').notEmpty(),
], register);


export default router;
