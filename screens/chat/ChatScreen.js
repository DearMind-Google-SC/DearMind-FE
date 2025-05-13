import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../../api/axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 'init',
      type: 'ai',
      text: 'How can I help you?',
    },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const fetchAIReply = async () => {
    try {
      const replyText = "That sounds really tough. I'm here for you.";
      await api.post('/chat/ai-reply', { message: replyText });

      const aiReply = {
        id: Date.now().toString() + '_ai',
        type: 'ai',
        text: replyText,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('AI 응답 실패:', err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      await api.post('/chat/user-message', { message: newMessage.text });
      fetchAIReply();
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.type === 'user' ? styles.userBubble : styles.aiBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Send Message"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F3',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  aiBubble: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messageText: {
    fontSize: 14,
    color: '#222',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#EB6A39',
    borderRadius: 24,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
