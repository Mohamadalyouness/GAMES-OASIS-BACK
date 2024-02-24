import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  watchLink: {
    type: String,
    required: true
  },
  teamLogos: [{
    type: String,
    required: true
  }],
  teamNames: [{
    type: String,
    required: true
  }],
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  gameName: {
    type: String,
    required: true
  }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
