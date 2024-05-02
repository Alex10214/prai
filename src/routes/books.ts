import {Router} from "express";
import {roleMiddleware} from '../middleware/roleMiddeleWare'
import {authMiddleware} from '../middleware/authMiddleware'

import {
    createBook,
    deleteBook,
    getAllBooks,
    updateBook,
    getBookById
} from '../controllers/books'


const router = Router();

router.post("/", authMiddleware, roleMiddleware('admin'), createBook);
router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, roleMiddleware('admin'), getBookById);
router.put("/:id", authMiddleware, roleMiddleware('admin'), updateBook);
router.delete("/:id", authMiddleware, roleMiddleware('admin'), deleteBook);

export default router;
