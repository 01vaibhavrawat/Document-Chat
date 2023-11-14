import { useState, useEffect } from "react";

const useChat = () => {
  const [chat, setChat] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  useEffect(() => {
    const storedChat = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    setChat(storedChat);
  }, []);

  const addMessage = (message) => {
    setChat((prevChat) => {
      return [...prevChat, message];
    });
    sessionStorage.setItem("chatHistory", JSON.stringify([...chat, message]));
  };

  const askQuestion = () => {
    const newMessage = { question: currentQuestion };
    addMessage(newMessage);
  };

  const addAnswer = (answer, updatedChat) => {
    const lastMessageIndex = updatedChat.length - 1;
    if (lastMessageIndex >= 0 && !updatedChat[lastMessageIndex].answer) {
      const updatedMessage = { ...updatedChat[lastMessageIndex], answer };
      setChat([...updatedChat.slice(0, lastMessageIndex), updatedMessage]);
      sessionStorage.setItem(
        "chatHistory",
        JSON.stringify([
          ...updatedChat.slice(0, lastMessageIndex),
          updatedMessage,
        ])
      );
    }
  };

  return {
    chat,
    currentQuestion,
    setCurrentQuestion,
    askQuestion,
    addAnswer,
  };
};

export default useChat;
