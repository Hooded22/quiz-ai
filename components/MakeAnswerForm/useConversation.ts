import { useState } from "react";

export type Sender = "user" | "ai";

export interface Message {
    sender: Sender;
    content: string;
}

export const useConversation = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const resetMessages = () => {
        setMessages([]);
    };

    const addMessage = (sender: Sender, content: string): void => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender, content }
        ]);
    };

    return {
        messages,
        addMessage,
        resetMessages
    };
};


