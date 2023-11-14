import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import customTheme from "../../constants/customTheme";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatUI from "../chat/ChatUI";
import FileUpload from "../fileUpload/FileUpload";
import Button from "@mui/material/Button";
import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import logo from "../../assets/Images/logo_only.png";
import { Link as LinkR } from "react-router-dom";
import useChat from "../../hooks/useChat";
import HistoryIcon from '@mui/icons-material/History';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const { chat } = useChat();
  const [open, setOpen] = React.useState(true);
  const [updatedChat, setUpdatedChat] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const scrollToQuestion = (questionIndex) => {
    const element = document.getElementById(`question-${questionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    console.log("chat log>", chat);
  }, [chat]);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ background: customTheme.primary_background }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <LinkR to="/">
              <img
                alt="logo"
                src={logo}
                style={{ objectFit: "contain", width: "40px", height: "35px" }}
              ></img>
            </LinkR>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: customTheme.primary_background,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={{ color: customTheme.primary_text }} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              paddingBottom: "25px",
            }}
          >
            <List>
              {updatedChat.length === 0 && (
                
                <ListItem key={"helper"} disablePadding>
                  <ListItemButton
                    sx={{
                      color: customTheme.primary_text,
                    }}
                  >
                  <ListItemIcon sx={{ minWidth: "35px" }}>
                    <HistoryIcon
                      sx={{
                        color: customTheme.primary_text,
                        fontSize: "19px",
                      }}
                    />
                  </ListItemIcon>
                    <ListItemText
                      primary="History Goes here..."
                    />
                  </ListItemButton>
                </ListItem>
              )}
              {updatedChat.map((obj, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      color: customTheme.primary_text,
                    }}
                    onClick={() => scrollToQuestion(index)} // Call the function
                  >
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                      <ChatBubbleOutlineIcon
                        sx={{
                          color: customTheme.primary_text,
                          fontSize: "19px",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={obj.question.slice(0, 25)} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                component={Link}
                to="/file-upload"
                sx={{
                  marginTop: "auto",
                  background: customTheme.button_primary,
                  padding: "4px 35px 4px 35px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  color: "black",
                  "&:hover": {
                    background: customTheme.button_primary,
                  },
                }}
              >
                Upload New File
              </Button>
            </div>
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route
              path="/"
              element={
                <ChatUI
                  useChat={useChat}
                  setUpdatedChat={setUpdatedChat}
                  scrollToQuestion={scrollToQuestion} // Pass the function
                />
              }
            />
            <Route path="/file-upload" element={<FileUpload />} />
          </Routes>
        </Main>
      </Box>
    </Router>
  );
}
