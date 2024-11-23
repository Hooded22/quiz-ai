import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import {gptMessagesType} from "../../types/aiModels";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const prompt: gptMessagesType[] = req.body.prompt;

    const openai = new OpenAI({
        apiKey: process.env.GPT_API_KEY,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: 0.7,
            max_tokens: 3072,
            messages: prompt,
        });

        res.status(200).json({ content: response.choices[0].message?.content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from OpenAI API' });
    }
}