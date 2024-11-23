import {gptMessagesType} from "./index";

export function prepareGPTPrompt(questionTitle: string, answer: string, topic: string): gptMessagesType[] {
    const systemRoleDescription = `Act as world calss teacher and expert in ${topic} Below are two things: a "Question" related to a ${topic} (the sentence after "Question:") and "My answer" (the sentences after "Answer:"). Keep in mind that "My answer" might not always be true. Your task is to determine the correct answer for this question and compare it with "My answer." If "My answer" is correct, display "Correct answer!" Otherwise, display "Incorrect answer" and explain why "My answer" was incorrect.`
    const systemMessage = `${systemRoleDescription}\nQuestion:\n${questionTitle}`;
    const userMessage = `Answer:\n${answer}`;
    const gptMessages: gptMessagesType[] = [
        {role: "system", content: systemMessage},
        {role: "user", content: userMessage }
    ]


    return gptMessages;
}

export function prepareGPTPromptWithCorrectAnswer(question: string, myAnswer: string, correctAnswer: string, topic: string): gptMessagesType[] {
    const systemRoleDescription = `As a teacher, check if user response is a correct answer for a question related to ${topic}. I will provide question, and the correct answer for comparison. Based on provided correct answer and user's response check if user's answer is correct. 
    
    \n\n If user's input is correct respond with 'CORRECT' string and nothing more. If it is not correct, respond with 'INCORRECT' and nothing more.`
    const systemMessage = `${systemRoleDescription}
    \n\n###Question\n ${question}
    \n\n###Correct answer:\n${correctAnswer}
    `;
    const userMessage = `My answer: ${myAnswer}`

    const gptMessages: gptMessagesType[] = [
        {role: 'system', content: systemMessage},
        {role: "user", content: userMessage}
    ]

    return gptMessages
}