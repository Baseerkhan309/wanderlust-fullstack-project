const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

module.exports.generateDescription = async (req, res) => {

    console.log("REQ BODY:", req.body);
    const { title, location, category } = req.body;

    const response = await ai.models.generateContent({
        model: "models/gemini-3.5-flash-lite",
        contents: `Write a professional and attractive travel description for this listing.

      Title: ${title}
      Location: ${location}
      Category: ${category}
     Keep the description around 80-100 words. Make it suitable for a travel website and do not use emojis.`,
    });

    const text = response.text;
    res.json({ description: text });
};
