import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import api from '../../api/axios';
import { useRoute } from '@react-navigation/native';

const EMOTION_COLOR = {
  happy: '#9ADBA5',
  gloomy: '#A29BFE',
  anxious: '#FEC868',
  angry: '#FF6B6B',
};

const EMOTION_FACE = {
  happy: require('../../assets/characters/happy_small.png'),
  gloomy: require('../../assets/characters/gloomy_small.png'),
  anxious: require('../../assets/characters/anxious_small.png'),
  angry: require('../../assets/characters/angry_small.png'),
};

const CalendarChartScreen = () => {
  const route = useRoute();
  const { year, month } = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/diary/monthly-emotion-type-count', {
          params: { year, month },
        });
        setData(res.data);
      } catch (e) {
        console.error('감정 통계 불러오기 실패:', e);
      }
    };
    fetchStats();
  }, [year, month]);

  const maxCount = data[0].count || 1;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 대표 감정 캐릭터 */}
      {data[0] && (
        <View style={styles.characterContainer}>
          <Image source={EMOTION_FACE[data[0].emotionType]} style={styles.characterImage} />
          <Text style={styles.title}>
            {year}년 {month}월
          </Text>
        </View>
      )}

      {/* 감정 통계 바 */}
      {data.map((item, index) => (
        <View key={index} style={styles.barRow}>
          <View style={[styles.emotionDot, { backgroundColor: EMOTION_COLOR[item.emotionType] }]} />
          <View style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: EMOTION_COLOR[item.emotionType],
                  width: `${(item.count / maxCount) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.count}>{item.count}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  characterContainer: { alignItems: 'center', marginBottom: 24 },
  characterImage: { width: 100, height: 100, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  emotionDot: { width: 24, height: 24, borderRadius: 12, marginRight: 12 },
  barWrapper: {
    flex: 1,
    height: 16,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  bar: {
    height: 16,
    borderRadius: 8,
  },
  count: { fontSize: 14, width: 24, textAlign: 'center' },
});

export default CalendarChartScreen;
