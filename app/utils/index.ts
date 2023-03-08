import axios from "axios";

export async function sendPromptToGPT(prompt: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 1250,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    throw error;
  }
}
