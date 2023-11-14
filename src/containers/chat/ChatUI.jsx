import { makeStyles } from "@mui/styles";
import React, { useRef, useEffect } from "react";
import customTheme from "../../constants/customTheme";
import { TextField, List, Typography } from "@mui/material";
import { getChatResponseRequest } from "../../store/actions";
import { useDispatch } from "react-redux";
import useChat from "../../hooks/useChat";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "81.2vh",
    margin: "0 auto",
    width: "80%",
    maxWidth: "900px",
  },
  chatHistory: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    position: "relative",
    "&::-webkit-scrollbar": {
      width: "10px", // Set the width of the scrollbar
    },
    "&::-webkit-scrollbar-thumb": {
      background: customTheme.tersary_background, // Set the scrollbar thumb color
      borderRadius: "4px", // Round the edges of the scrollbar thumb
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent", // Set the scrollbar track background
    },
  },
  chatInput: {
    display: "flex",
    padding: "16px",
    width: "100%",
    float: "bottom",
  },
  inputField: {
    flexGrow: 1,
    width: "100%",
  },
}));

const ChatComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { chat, currentQuestion, setCurrentQuestion, askQuestion, addAnswer } =
    useChat();
  const chatHistoryRef = useRef(null);

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && currentQuestion) {
      askQuestion();
      setCurrentQuestion("");
    }
  };

  useEffect(() => {
    let lastMessageIndex = chat.length - 1
    if (lastMessageIndex >= 0 && !chat[lastMessageIndex].answer) {
      dispatch(
        getChatResponseRequest({ question: currentQuestion }, addAnswer, chat)
      );
    }
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className={classes.root}>
      <div className={classes.chatHistory} ref={chatHistoryRef}>
        <List>
          {chat.map((message, index) => (
            <div key={index}>
              {message.question && (
                <div style={{ marginBottom: "10px", padding: "5px 9px" }}>
                  <Typography variant="subtitle1" color="primary">
                    You
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {message.question}
                  </Typography>
                </div>
              )}
              {message.answer && (
                <div
                  style={{
                    background: customTheme.tersary_background,
                    marginBottom: "10px",
                    padding: "5px 9px",
                  }}
                >
                  <Typography variant="subtitle1" color="primary">
                    Server
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {message.answer}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </List>
      </div>
      <div className={classes.chatInput}>
        <TextField
          className={classes.inputField}
          variant="outlined"
          label="Type a message"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyPress={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
