const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const Router = express.Router();

const config = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

Router.get('/', (req, res) => {
    res.send("Search anything");
});

Router.post('/chat', async (req, res) => {
    const data = req.body.data;
    try {
        const inpt = `${data}`;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Write a shayari on ${inpt}`,
            max_tokens: 2048,
            temperature: 1,
        });

        const textResp = response.data.choices[0].text;
        let text = textResp.slice(2, -1);
        text.split('\n')
        res.send({ "ans": `${text}` });
    } catch (err) {
        console.log(err);
        res.status(501).send(err.message);
    }
});

module.exports = { Router };
