"use client"

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 68px;
    height: 100%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 16px;
`

const QuestionHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px
`

const QuestionTitle = styled.h1`
    font-size: 20px;
    color: white;
`

const UserInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ConversationContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 20px;
`

export const Styled = {
    Wrapper,
    QuestionTitle,
    Content,
    QuestionHeader,
    UserInputContainer,
    ConversationContainer
}
