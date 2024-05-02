import {Router} from "express";

import {
    createRole,
    deleteRole,
    getAllRoles,
    updateRole,
    getRoleById
} from '../controllers/roles'
import {roleMiddleware} from "../middleware/roleMiddeleWare";
import {authMiddleware} from "../middleware/authMiddleware";


const router = Router();

router.post("/", authMiddleware, roleMiddleware('admin'), createRole);
router.get("/", authMiddleware, roleMiddleware('admin'), getAllRoles);
router.get("/:id", authMiddleware, roleMiddleware('admin'), getRoleById);
router.put("/:id", authMiddleware, roleMiddleware('admin'), updateRole);
router.delete("/:id", authMiddleware, roleMiddleware('admin'), deleteRole);

export default router;
