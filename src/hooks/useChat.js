import { useState, useEffect } from "react";

const useChat = () => {
  const [chat, setChat] = useState(() => {
    const storedChat = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    return storedChat;
  });
  const [currentQuestion, setCurrentQuestion] = useState("");

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  const addMessage = (message) => {
    setChat((prevChat) => {
      const newChat = [...prevChat, message];
      return newChat;
    });
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
