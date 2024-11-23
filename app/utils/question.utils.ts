export function getRandomQuestion<T>(questions: T[]) {
    const min = 0;
    const max = Math.floor(questions.length - 1);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return questions[randomNumber];
}