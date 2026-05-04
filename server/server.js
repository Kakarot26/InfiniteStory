require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

const genres = [];
genres.push("fantasy", "horror");

async function getResponse(prompt, history) {
    const rules = prompt[0];
    const currentTurnMessage = prompt[1];
    try {

        const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
            "method":"POST",
            "headers": {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            "body": JSON.stringify({
                "model":"llama-3.3-70b-versatile",
                "messages":[
                    {role:"system", "content": rules},
                    ...history,
                    {"role":"user", "content":`${currentTurnMessage}`}
                ]
            })
        })
        const data = await response.json();
        return data.choices[0].message.content;
    } catch(e) {
        console.log(e);
        return null;
    }
}

app.post('/api/story', async (req, res) => {
    const input = req.body;
    let characterName = input.characterName;
    let history = input.history;
    let choicePick = input.choicePick;
    let genrePick = input.genrePick;
    const rules = `
        1) Act as a storyteller, write a ${genres[genrePick]} story.
        2) Generate easy to understand stories
        3) Stories must be contextually correct.
        4) At the end of your response, on a new line, write exactly this format: CHOICES: choice one | choice two | choice three
    `
    let currentTurnMessage;
    if(history.length === 0) {
        currentTurnMessage = `Begin the story, My name is ${characterName}`;
    }
    else {
        currentTurnMessage = "I choose: " + choicePick;
    }
    let prompt = [];
    prompt.push(rules, currentTurnMessage);
        
    const data = await getResponse(prompt, history);
    if(data === null)   res.status(500).json({message:"Internal Server Error"});
    history.push({role:"user", content:currentTurnMessage});
    history.push({role:"assistant", content:data});
    const parts = data.split("CHOICES:");
    const storyText = parts[0].trim();
    const choices = parts[1].split("|").map(c => c.trim());
    res.status(200).json({storyText, choices, history});
})

app.listen(4000, () => {
    console.log(`Server running on port 4000`);
});