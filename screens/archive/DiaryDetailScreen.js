import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../api/axios';

const DiaryDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await api.get(`/diary/${id}`);
        setDiary(res.data);
      } catch (e) {
        console.error('일기 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#FEC868" />;
  }

  if (!diary) {
    return (
      <View style={styles.container}>
        <Text>일기를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: diary.imageUrl }} style={styles.image} />
      <Text style={styles.date}>{diary.date}</Text>
      <Text style={styles.text}>{diary.text}</Text>
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

export default DiaryDetailScreen;
