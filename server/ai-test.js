require('dotenv').config();

const axios = require('axios');

async function testAI() {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'Once upon a time, in a small village...',
                },
            ],
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 1,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${openaiApiKey}`,
            },
        }
    );

    console.log('AI response:', response.data.choices[0].message.content);
}

testAI();
