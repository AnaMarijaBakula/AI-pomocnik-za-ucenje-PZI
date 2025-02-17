// services/openaiService.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Funkcija koja šalje prompt OpenAI-u i dobiva odgovor
const getOpenAIResponse = async (prompt) => {
    try {
        // Dodajte upute u prompt koji šaljete OpenAI-u
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",  // Ili model po vašoj želji
            messages: [
                {
                    role: "system",
                    content: "You are a code reviewer assistant. Please analyze the code and provide recommendations for improvement, point out any issues or potential optimizations, and suggest best practices."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Greška u OpenAI pozivu:", error);
        throw error;
    }
};

module.exports = { getOpenAIResponse };
