import express from 'express';
import * as newsController from '../Controllers/NewsController.js';
import upload from "../Config/multer.js"
import auth from "../Middleware/auth.js"
const router = express.Router();

// Route to create a new news item
router.post('/',auth,upload.single('images'), newsController.createNews);

// Route to get all news items
router.get('/', newsController.getAllNews);

// Route to get a single news item by ID
router.get('/:id', newsController.getNewsById);

// Route to update a news item by ID
router.patch('/:id',auth,upload.single('images'), newsController.updateNews);

// Route to delete a news item by ID
router.delete('/:id',auth, newsController.deleteNews);

export default router;
