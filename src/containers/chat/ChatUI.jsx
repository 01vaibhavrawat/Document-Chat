import { makeStyles } from "@mui/styles";
import React, { useRef, useEffect } from "react";
import customTheme from "../../constants/customTheme";
import { TextField, List, Typography } from "@mui/material";
import { getChatResponseRequest } from "../../store/actions";
import { useDispatch } from "react-redux";
import chatImg from "../../assets/Images/chat.svg";
import { Link } from "react-router-dom";

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
      width: "10px", 
    },
    "&::-webkit-scrollbar-thumb": {
      background: customTheme.tersary_background,
      borderRadius: "4px", 
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent", 
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

const ChatComponent = ({ useChat, setUpdatedChat, scrollToQuestion }) => {

  const hasUserUploadedDocument = sessionStorage.getItem("hasUserUploadedDocument");

  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    chat,
    currentQuestion,
    setCurrentQuestion,
    askQuestion,
    addAnswer,
  } = useChat();
  const chatHistoryRef = useRef(null);

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && currentQuestion) {
      askQuestion(currentQuestion);
    }
  };

  useEffect(() => {
    let lastMessageIndex = chat.length - 1;
    if ( !chat[lastMessageIndex]?.answer) {
      dispatch(
        getChatResponseRequest(
          { question: currentQuestion },
          addAnswer,
          chat
        )
      );
      setCurrentQuestion("");

    }
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
    setUpdatedChat(chat);
  }, [chat]);

  return (
    <div className={classes.root}>
      <div className={classes.chatHistory} ref={chatHistoryRef}>
        {chat.length === 0 && (
          <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
              width: "100%",
            }}
          >
            <img
              alt="Start the conversation"
              src={chatImg}
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
                opacity: ".85",
              }}
            />
          </div>
          <div style={{display:"flex", justifyContent:"center", color: customTheme.primary_background}}>
          <div>Please upload a PDF file <Link to="file-upload">here</Link> to start a conversation! </div>
          </div>
          </>
        )}
        <List>
          {chat.map((message, index) => (
            <div key={index} id={`question-${index}`}>
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
      {hasUserUploadedDocument && <div className={classes.chatInput}>
        <TextField
          className={classes.inputField}
          variant="outlined"
          label="Type a message..."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyPress={(e) => {
            handleSendMessage(e);
            scrollToQuestion(chat.length - 1);
          }}
        />
      </div>}
    </div>
  );
};

export default ChatComponent;
