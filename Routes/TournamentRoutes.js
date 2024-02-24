import express from 'express';
import * as tournamentController from '../Controllers/TournamentController.js';
import upload from "../Config/multer.js"
import auth from "../Middleware/auth.js"
const router = express.Router();

// Route to create a new tournament (restricted to admin)
router.post('/', auth, upload.array('teamLogos'), tournamentController.createTournament);

// Route to update a tournament (restricted to admin)
router.patch('/:id',auth,  upload.array('teamLogos'),tournamentController.updateTournament);

// Route to delete a tournament (restricted to admin)
router.delete('/:id',auth, tournamentController.deleteTournament);

// Route to get all tournaments
router.get('/', tournamentController.getAllTournaments);

// Route to get a tournament by ID
router.get('/:id', tournamentController.getTournamentById);

export default router;
