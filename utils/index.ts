export type gptMessagesType = { role: "system" | "user", content: string };

export async function sendPromptToGPT(prompt: gptMessagesType[]) {
   try {
       const response = await fetch("/api/sendAIRequest", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({prompt})
       })

       console.log("DATA: ", response)


       const data = await response.json();

       if(response.ok) {
           console.log("DATA: ", data)
           return data.content
       } else {
           throw new Error(data.error)
       }
   } catch (error: any) {
       throw new Error(error)
   }
}