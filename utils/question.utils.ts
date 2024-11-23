export function getRandomQuestion<T>(questions: T[]) {
    const min = 0;
    const max = Math.floor(questions.length - 1);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return questions[randomNumber];
}

export function getAnswerCheckResponseWithCorrectAnswer(aiResponse: string, correctAnswer: string) {
    console.log("getAnswerCheckResponseWithCorrectAnswer", aiResponse, correctAnswer);
    const isAnswerCorrect = aiResponse === "CORRECT";
    const answerStatus = isAnswerCorrect ? "Correct answer, good job!" : "Sorry, your answer is incorrect!";

    return `## ${answerStatus}\n\n**Correct answer**:\n\n${correctAnswer}`.toString();
}