//GMAI/server/routes/gameSession.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to generate AI Dungeon Master and campaign generating responses
router.post('/generate', async (req, res) => {
    // Extract the messages from the request body  
    const messages = req.body.messages;

    console.log('AI DM Processing the following messages');
    console.log(messages);

    // Make a POST request to the OpenAI API for the AI DM
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: messages,
            max_tokens: 300,
            temperature: 0.8
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the AI's message from the response   
        const aiMessage = response.data.choices[0].message.content.trim();
        console.log('AI DM processed:', aiMessage);


        // Send the AI's message back as the response 
        res.json(aiMessage);
    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error);
        let errorMessage = error.response ? error.response.data : error.message;
        res.status(500).json({ error: `Error generating text: ${errorMessage}` });
    }
});

// Route to generate campaign generating responses 
router.post('/generate-campaign', async (req, res) => {
    // Extract the messages from the request body  
    const messages = req.body.messages;

    console.log('Prepper is Processing the following messages');
    console.log(messages);

    // Make a POST request to the OpenAI API for the AI DM
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 400,
            temperature: 0.8
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the AI's message from the response  
        const aiMessage = response.data.choices[0].message.content.trim();

        // Send the AI's message back as the response 
        res.json(aiMessage);
    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error);
        let errorMessage = error.response ? error.response.data : error.message;
        res.status(500).json({ error: `Error generating text: ${errorMessage}` });
    }
});

// Route to generate game session summary   
router.post('/generate-summary', async (req, res) => {
    try {
        // Extract the messages and the existing summary from the request body   
        const messages = req.body.messages;
        //console.log("AI notetaker is processing the following:");
        //console.log(messages);

        // Make a POST request to the Notetaker AI API
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.8
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the AI's message from the response  
        const aiSummary = response.data.choices[0].message.content.trim();

        // Send the AI's summary back as the response
        res.json(aiSummary);
    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error);
        let errorMessage = error.response ? error.response.data : error.message;
        res.status(500).json({ error: `Error generating text: ${errorMessage}` });
    }

});

// Export the router to be used in other files
module.exports = router;