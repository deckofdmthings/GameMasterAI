const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
    // dm: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Removed
    // players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Removed
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preference' },
    sessionDate: { type: Date, default: Date.now },
});

const GameSession = mongoose.model('GameSession', GameSessionSchema);

module.exports = GameSession;
