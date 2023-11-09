import { makeStyles } from '@mui/styles';
import React, { useState, useRef, useEffect } from 'react';
import customTheme from "../../constants/customTheme";
import {
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '81.2vh',
    margin: '0 auto', 
    width: '80%',      
    maxWidth: '900px', 
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    position: 'relative', 
    '&::-webkit-scrollbar': {
      width: '10px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
      background: customTheme.tersary_background, // Set the scrollbar thumb color
      borderRadius: '4px', // Round the edges of the scrollbar thumb
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent', // Set the scrollbar track background
    }
  },
  chatInput: {
    display: 'flex',
    padding: '16px',
    width: '100%', 
    float:"bottom"   
  },
  inputField: {
    flexGrow: 1,
    width: '100%',    
  },
}));

const ChatComponent = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatHistoryRef = useRef(null);

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && newMessage) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={classes.root}>
      <div className={classes.chatHistory} ref={chatHistoryRef}>
        <List>
          <div key={"temporary"}>
              <ListItem
                alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"You"}
                />
              </ListItem>
            </div>
          <div key={"temporary"} style={{background: customTheme.tersary_background}}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"Server"}
                />
              </ListItem>
            </div>
            
          <div key={"temporary"}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"You"}
                />
              </ListItem>
            </div>
          <div key={"temporary"} style={{background: customTheme.tersary_background}}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"Server"}
                />
              </ListItem>
            </div>
            
          <div key={"temporary"}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"You"}
                />
              </ListItem>
            </div>
          <div key={"temporary"} style={{background: customTheme.tersary_background}}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                  primary={"Server"}
                />
              </ListItem>
            </div>
        </List>
      </div>
      <div className={classes.chatInput}>
          <TextField
            className={classes.inputField}
            variant="outlined"
            label="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleSendMessage}
          />
        </div>
    </div>
  );
};

export default ChatComponent;