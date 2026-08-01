const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

module.exports.generateDescription = async (req, res) => {

    const response = await ai.models.generateContent({
        model: "models/gemini-3.5-flash-lite",
        contents: "Say Hello from Gemini.",
    });
    const text = response.text;
    res.send(text);
};