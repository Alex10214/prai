import {Router} from "express";

import {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getUserById
} from '../controllers/users'
import {roleMiddleware} from "../middleware/roleMiddeleWare";
import {authMiddleware} from "../middleware/authMiddleware";


const router = Router();

router.post("/", authMiddleware, roleMiddleware('admin'), createUser);
router.get("/", authMiddleware, roleMiddleware('admin'), getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware('admin'), getUserById);
router.put("/:id", authMiddleware, roleMiddleware('admin'), updateUser);
router.delete("/:id", authMiddleware, roleMiddleware('admin'), deleteUser);

export default router;
