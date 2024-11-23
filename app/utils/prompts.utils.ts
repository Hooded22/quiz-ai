import {gptMessagesType} from "@/utils/index";

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
    const systemRoleDescription = `As a teacher, check if my answer is correct for a question related to ${topic}. I will provide the correct answer for comparison. If my answer is correct, respond with 'Correct answer.' If it is not correct, respond with 'Not correct answer,' show the correct answer, and explain why my answer was not correct.`
    const systemMessage = `${systemRoleDescription}\n\nQuestion\n ${question}Correct answer\n${correctAnswer}\n\n`;
    const userMessage = `My answer: ${myAnswer}`

    const gptMessages: gptMessagesType[] = [
        {role: 'system', content: systemMessage},
        {role: "user", content: userMessage}
    ]

    return gptMessages
}