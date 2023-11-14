import { useState, useEffect } from 'react';

const useChat = () => {
  const [chat, setChat] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const storedChat = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
    setChat(storedChat);
  }, []);

  const addMessage = (message) => {
    setChat([...chat, message]);
    sessionStorage.setItem('chatHistory', JSON.stringify([...chat, message]));
  };

  const askQuestion = () => {
    const newMessage = { question: currentQuestion };
    addMessage(newMessage);
  };

  const addAnswer = (answer) => {
    const lastMessageIndex = chat.length - 1;
    if (lastMessageIndex >= 0 && !chat[lastMessageIndex].answer) {
      const updatedMessage = { ...chat[lastMessageIndex], answer };
      setChat([...chat.slice(0, lastMessageIndex), updatedMessage]);
      sessionStorage.setItem('chatHistory', JSON.stringify([...chat.slice(0, lastMessageIndex), updatedMessage]));
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
