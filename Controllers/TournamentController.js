// controllers/TournamentController.js
import Tournament from "../Models/TournamentModel.js";

export const createTournament = async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admins can create tournaments" });
    }

    const { watchLink, teamOneName, teamTwoName, time, date, gameName } =
      req.body;

    const teamLogos = req.files;
    var images_array = [];
    teamLogos.map((each) => images_array.push(each.filename));

    // Create the tournament with the provided data
    const tournament = await Tournament.create({
      watchLink,
      teamLogos: images_array,
      teamNames: [teamOneName, teamTwoName],
      time,
      date,
      gameName,
    });

    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTournament = async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admins can update tournaments" });
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.json({ message: "Tournament updated", tournament: updatedTournament });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admins can delete tournaments" });
    }

    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.json({ message: "Tournament deleted", tournament });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({});
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
