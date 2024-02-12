// routes/products.js
import express from 'express';
import * as CommunityControllers from "../Controllers/CommunityController.js"
import upload from "../Config/multer.js"
import auth from "../Middleware/auth.js"
const router = express.Router();

// Route for adding a new product
router.post('/',auth,upload.single('images'),CommunityControllers.createCommunity);

// Route for getting all products
router.get('/', CommunityControllers.getAllCommunities);

// Route for getting a single product by ID
router.get('/:id',CommunityControllers.getCommunityById);

// Route for updating a product by ID
router.put('/:id',upload.single('images'),CommunityControllers.updateCommunity);

// Route for deleting a product by ID
router.delete('/:id', CommunityControllers.deleteCommunity);

export default router;
