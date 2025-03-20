import React, { useState, useEffect } from 'react';
import ollama from 'ollama';
import Navbar from './Navbar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './chatbot.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageSeparator,
  MessageInput,
  Sidebar,
  Conversation,
  Avatar,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  Search,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

function Chatbot() {
  const [selectedBot, setSelectedBot] = useState({
    name: 'Varsha',
    info: 'Mocharla',
    avatar: 'https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg',
    status: 'active', // Initially set to active
  });
  const [messages, setMessages] = useState({
    Varsha: [{ message: '', direction: 'incoming', timestamp: new Date() }],
    Divya: [{ message: '', direction: 'incoming', timestamp: new Date() }],
    Yamuna: [{ message: '', direction: 'incoming', timestamp: new Date() }],
    Meghana: [{ message: '', direction: 'incoming', timestamp: new Date() }],
    Nethra: [{ message: '', direction: 'incoming', timestamp: new Date() }],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botData, setBotData] = useState([
    {
      name: 'Varsha',
      info: "last seen: Dec 8 2024",
      avatar: 'https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg',
      status: 'inactive', // Initially inactive
    },
    {
      name: 'Divya',
      info: "last seen: 1hr ago",
      avatar: 'https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg',
      status: 'inactive',
    },
    {
      name: 'Yamuna',
      info: "Last seen: Yesterday",
      avatar: 'https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg',
      status: 'inactive',
    },
    {
      name: 'Meghana',
      info: 'Last seen: Just now',
      avatar: 'https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg',
      status: 'inactive',
    },
    {
      name: 'Nethra',
      info: 'Status: Online',
      avatar: 'https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg',
      status: 'inactive',
    },
  ]);

  const conversationHandler = (clickedBot) => {
    // Set the selected bot and make it active, and set others to inactive
    setSelectedBot(clickedBot);
    setBotData((prevData) =>
      prevData.map((bot) =>
        bot.name === clickedBot.name
          ? { ...bot, status: 'active' } // Set clicked bot to active
          : { ...bot, status: 'inactive' } // Set other bots to inactive
      )
    );
  };

  const messageHandler = async (e) => {
    // Add the user's message to the selected bot's message history
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedBot.name]: [
        ...(prevMessages[selectedBot.name] || []),
        { message: e, direction: 'outgoing', timestamp: new Date() },
      ],
    }));
    setIsTyping(true);

    try {
      const response = await ollama.chat({
        model: 'llama3.2:1b',
        messages: [{ role: 'user', content: e }],
      });

      // Add the bot's response to the selected bot's message history
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedBot.name]: [
          ...(prevMessages[selectedBot.name] || []),
          {
            message: response.message.content,
            direction: 'incoming',
            timestamp: new Date(),
          },
        ],
      }));
    } catch (error) {
      console.error('Error fetching bot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessageList = () => {
    const selectedBotMessages = messages[selectedBot.name] || [];
    const messageElements = [];
    let lastDate = null;

    selectedBotMessages.forEach((msg, index) => {
      const messageDate = msg.timestamp.toLocaleDateString();

      if (messageDate !== lastDate) {
        messageElements.push(
          <MessageSeparator key={`separator-${index}`} content={messageDate} />
        );
        lastDate = messageDate;
      }

      messageElements.push(
        <Message
          key={index}
          model={{
            message: msg.message,
            direction: msg.direction,
          }}
        />
      );
    });

    return messageElements;
  };

  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', height: '500px' }}>
        <MainContainer>
          <Sidebar position="left" scrollable={true}>
            <Search
              placeholder="Search bots..."
              value={searchQuery}
              onChange={(v) => setSearchQuery(v)}
              onClearClick={() => setSearchQuery('')}
            />
            {botData
              .filter((bot) =>
                bot.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((bot) => (
                <Conversation
                  info={bot.info}
                  name={bot.name}
                  active={bot.status === 'active'}
                  onClick={() => conversationHandler(bot)}
                  key={bot.name}
                >
                  <Avatar name={bot.name} src={bot.avatar} />
                </Conversation>
              ))}
          </Sidebar>
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar name={selectedBot.name} src={selectedBot.avatar} />
              <ConversationHeader.Content
                info={selectedBot.info}
                userName={selectedBot.name}
                active={selectedBot.status === 'active'}
              />
              <ConversationHeader.Actions>
                <StarButton title="Add to favourites" />
                <VoiceCallButton title="Start voice call" />
                <VideoCallButton title="Start video call" />
                <InfoButton title="Show info" />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              {renderMessageList()}
              {isTyping && <TypingIndicator content="The bot is typing..." />}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={messageHandler} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default Chatbot;
