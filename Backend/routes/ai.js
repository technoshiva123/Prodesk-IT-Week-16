const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { z } = require('zod'); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const suggestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100)
});

router.post('/suggest', async (req, res) => {
    try {
        const validation = suggestSchema.safeParse(req.body);
        
        if (!validation.success) {
            const errorMsg = validation.error?.errors?.[0]?.message || "Invalid input details";
            return res.status(400).json({ 
                error: "Bad Request", 
                message: errorMsg 
            });
        }

        const { title } = validation.data;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Based on the task "${title}", suggest 3 small sub-steps. 
        Return ONLY a JSON object: {"steps": ["step 1", "step 2", "step 3"]}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanText = text.replace(/```json|```/g, "").trim();
        const cleanJson = JSON.parse(cleanText);
        
        return res.json(cleanJson);

    } catch (err) {
        console.error("DEBUG AI ERROR:", err.message);
        
        return res.status(500).json({ 
            error: "Internal Server Error", 
            message: "AI Suggestion Failed",
            details: err.message 
        });
    }
});

module.exports = router;