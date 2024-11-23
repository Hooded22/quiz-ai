import axios from "axios";

export type gptMessagesType = {role: "system" | "user", content: string}

export async function sendPromptToGPT(prompt: gptMessagesType[]) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 3072,
        messages: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
