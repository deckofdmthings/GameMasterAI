const openai = require('openai');
openai.apiKey = process.env.OPENAI_API_KEY;

async function generateResponse(prompt, options = {}) {
    const defaultOptions = {
        engine: gpt-3.5-turbo, // Use the appropriate GPT-4 engine when it becomes available 
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        temperature: 1.0,
    };

    const requestOptions = Object.assign(defaultOptions, options);

    try {
        const response = await openai.Completion.create(requestOptions);
        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating AI response:', error);
        return null;
    }

    module.exports = { generateResponse };

}
