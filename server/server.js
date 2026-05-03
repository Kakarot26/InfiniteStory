require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.post('/api/story', async (req, res) => {
    try {
        const prompt = `Write a short story`;
        const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
            "method":"POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            "body": JSON.stringify({
                "model":"llama-3.3-70b-versatile",
                "messages":[
                    {"role":"user", "content":`${prompt}`}
                ]
            })
        })
        const data = await response.json();
        res.status(200).json(data.choices[0].message.content);
    }
    catch(e) {
        res.status(500).json(`Server Error`);
    }
})

app.listen(4000, () => {
    console.log(`Server running on port 4000`);
});