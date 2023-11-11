// GMAI/server/models/GameState.js

const mongoose = require('mongoose');


const GameStateSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true,
    },
  
    gameSetup: Object,
    conversation: Array,
    summaryConversation: Array,
    summary: String,
    totalTokenCount: Number,
    userAndAssistantMessageCount: Number,
    systemMessageContentDM: String
});

module.exports = mongoose.model('GameState', GameStateSchema);
