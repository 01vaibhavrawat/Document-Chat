import { makeStyles } from '@mui/styles';
import React, { useState, useRef, useEffect } from 'react';
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
    height: '82vh',
    margin: '0 auto',  // Center the component horizontally
    width: '75%',       // Set the component width to 85%
    maxWidth: '800px',  // Optional: You can set a maximum width if needed
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    position: 'relative',  // Add relative positioning
  },
  chatInput: {
    display: 'flex',
    padding: '16px',
    position: 'absolute', // Position the chat input absolutely
    bottom: 0,
    left: 0,
    width: '100%',        // Set the chat input to 100% width
  },
  inputField: {
    flexGrow: 1,
    width: '100%',         // Set the width of the input field to 100%
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
      <Paper className={classes.chatHistory} ref={chatHistoryRef}>
        <List>
          {messages.map((message, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={message.text}
                  secondary={message.sender === 'user' ? 'You' : 'ChatGPT'}
                />
              </ListItem>
              {index < messages.length - 1 && <Divider />}
            </div>
          ))}
        </List>

        <Paper className={classes.chatInput}>
          <TextField
            className={classes.inputField}
            variant="outlined"
            label="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleSendMessage}
          />
        </Paper>
      </Paper>
    </div>
  );
};

export default ChatComponent;