import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../api/axios';

const ChatScreen = ({ goBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);
  const [initTime, setInitTime] = useState(null);

  // ✅ 초기 메시지 불러오기
  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const [initRes] = await Promise.all([
          api.get('/chat/init'),
        ]);

        const now = new Date(); // ← 받아온 시점 저장
        setInitTime(now);

        const initMessage = {
          id: 'init',
          type: 'ai',
          text: initRes.data?.message || 'How can I help you?',
        };

        setMessages([initMessage]);
      } catch (err) {
        console.warn('초기 메시지 로드 실패:', err);
        setMessages([{ id: 'fallback', type: 'ai', text: 'How can I help you?' }]);
      }
    };

    loadInitialMessages();
  }, []);

  // ✅ 메시지 전송
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      type: 'user',
      text: input.trim(),
    };

    setMessages(prev => [...prev, userMsg]); // 사용자 메시지 즉시 반영
    setInput('');

    try {
      const res = await api.post('/chat', { message: userMsg.text });

      const aiReply = {
        id: `${Date.now()}_ai`,
        type: 'ai',
        text: res.data?.reply || res.data?.message || '응답이 없습니다.',
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error('채팅 오류:', err);
      setMessages(prev => [...prev, {
        id: `${Date.now()}_fail`,
        type: 'ai',
        text: 'Something Error.',
      }]);
    }
  };

  // ✅ 채팅 말풍선 렌더링
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.type === 'user' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat with Mind</Text>
        <Icon name="menu" size={20} color="#fff" />
      </View>

      <Text style={styles.dateLabel}>
        {initTime
          ? initTime.toLocaleString('en-US', {
              weekday: 'short',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Seoul',
            })
          : ''}
      </Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        extraData={messages}
      />

      <View style={styles.inputWrapper}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Send Message"
            placeholderTextColor="#B3B3B3"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F6F3' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#EB6A39',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateLabel: {
    alignSelf: 'center',
    marginVertical: 8,
    fontSize: 12,
    color: '#999',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  aiBubble: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messageText: {
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F6F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  input: {
    fontSize: 14,
    color: '#333',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#EB6A39',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
