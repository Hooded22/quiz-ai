import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MakeAnswerForm } from ".";
import * as utils from '@/utils';
import { prepareGPTPrompt, prepareGPTPromptWithCorrectAnswer } from "./useMakeAnswerForm";

jest.mock('@/utils', () => {
    return {
      __esModule: true,    //    <----- this __esModule: true is important
      ...jest.requireActual('@/utils')
    };
  });

const mockQuestions = [
    {question: "Q1: How much is 2+2?", answer: "4"}
]

describe("Getting answer for question", () => {
    it("Should display drawn question", () => {
        render(<MakeAnswerForm questionsWithAnswers={mockQuestions}/>);

        expect(screen.getByText("Q1: How much is 2+2?")).not.toBeNull();
    })
    it("Should display 'answer available' when answer exist for question", () => {
        render(<MakeAnswerForm questionsWithAnswers={mockQuestions}/>);

        expect(screen.getByText("answer available")).not.toBeNull();
    });
    it("Should send prompt with question and answer when question do not have predefined answer", async () => {
        const sendPromptToGPTMock = jest.spyOn(utils, "sendPromptToGPT");
        sendPromptToGPTMock.mockImplementationOnce(() => new Promise((res, rej) => res("Answer")));

        render(<MakeAnswerForm questionsWithAnswers={[{question: "Q1: How much is 2+2?", answer: undefined}]}/>);

        const input = screen.getByTitle("answer");
        const sendButton = screen.getByText("Send answer");
        const finalPrompt = prepareGPTPrompt("Q1: How much is 2+2?", "my answer")

        fireEvent.change(input, {target: { value: 'my answer' }})
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(sendPromptToGPTMock).toHaveBeenCalledWith(finalPrompt);
        })


    })
    it("SHould send prompt with question, user answer and correc answer when question has answer", async () => {
        const sendPromptToGPTMock = jest.spyOn(utils, "sendPromptToGPT");
        sendPromptToGPTMock.mockImplementationOnce(() => new Promise((res, rej) => res("Answer")));

        render(<MakeAnswerForm questionsWithAnswers={[{question: "Q1: How much is 2+2?", answer: "123"}]}/>);

        const input = screen.getByTitle("answer");
        const sendButton = screen.getByText("Send answer");
        const finalPrompt = prepareGPTPromptWithCorrectAnswer("Q1: How much is 2+2?", "my answer", "123")

        fireEvent.change(input, {target: { value: 'my answer' }})
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(sendPromptToGPTMock).toHaveBeenCalledWith(finalPrompt);
        })
    });
})