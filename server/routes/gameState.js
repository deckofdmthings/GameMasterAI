const express = require('express');
const router = express.Router();
const GameState = require('../models/GameState');

// Save game state 
router.post('/save', async (req, res) => {
    const {
        gameId,
        gameSetup,
        conversation,
        summaryConversation,
        summary,
        totalTokenCount,
        userAndAssistantMessageCount,
        systemMessageContentDM
    } = req.body;

    const update = {
        gameId,
        gameSetup,
        conversation,
        summaryConversation,
        summary,
        totalTokenCount,
        userAndAssistantMessageCount,
        systemMessageContentDM
    };

    try {
        // Find and update the game state by gameId, or create a new one if it doesn't exist
        let gameState = await GameState.findOneAndUpdate({ gameId }, update, { new: true, upsert: true });
        
        res.json(gameState);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save game state' });
    }
});

// Load game state
router.get('/load/:gameId', async (req, res) => {
    const { gameId } = req.params;

    try {
        // Find the game state by gameId
        const gameState = await GameState.findOne({ gameId });
        
        if (!gameState) {
            return res.status(404).json({ error: 'No game state found for this game' });
        }

        res.json(gameState);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load game state' });
    }
});

// Get all game states
router.get('/all', async (req, res) => {
    try {
        // Find all game states
        const gameStates = await GameState.find({});
        
        if (!gameStates || gameStates.length === 0) {
            return res.status(404).json({ error: 'No game states found' });
        }

        res.json(gameStates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load game states' });
    }
});

module.exports = router;
