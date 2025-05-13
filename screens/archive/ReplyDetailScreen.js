import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../api/axios';

const ReplyDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReply = async () => {
      try {
        const res = await api.get(`/reward/${id}`);
        setReply(res.data);
      } catch (e) {
        console.error('AI 응답 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchReply();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#9ADBA5" />;
  }

  if (!reply) {
    return (
      <View style={styles.container}>
        <Text>응답을 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: reply.imageUrl }} style={styles.image} />
      <Text style={styles.date}>{reply.date}</Text>
      <Text style={styles.text}>{reply.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ReplyDetailScreen;
