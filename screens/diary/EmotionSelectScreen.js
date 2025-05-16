import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import api from '../../api/axios';

const { height } = Dimensions.get('screen');

const EMOTIONS = [
  {
    id: 'HAPPY',
    label: 'HAPPY',
    color: '#58c663',
    image: require('../../assets/characters/happy.png'),
  },
  {
    id: 'GLOOMY',
    label: 'GLOOMY',
    color: '#7a7eff',
    image: require('../../assets/characters/gloomy.png'),
  },
  {
    id: 'ANXIOUS',
    label: 'ANXIOUS',
    color: '#ffa63f',
    image: require('../../assets/characters/anxious.png'),
  },
  {
    id: 'ANGRY',
    label: 'ANGRY',
    color: '#Ed3b3b',
    image: require('../../assets/characters/angry.png'),
  },
];

const EmotionSelectScreen = ({ goTo, recordId, exitDiary }) => {
  const [index, setIndex] = useState(0);
  const emotion = EMOTIONS[index];

  useEffect(() => {
    console.log('🧾 EmotionSelectScreen에 전달된 recordId:', recordId);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + EMOTIONS.length) % EMOTIONS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % EMOTIONS.length);
  };

  const handleSelect = async () => {
    if (!recordId) {
      Alert.alert('오류', '감정 기록 ID가 유실되었습니다.');
      exitDiary();
      return;
    }
    try {
      await api.patch(`/diary/${recordId}/emotion-type`, {
        emotionType: emotion.id,
      });
      exitDiary();
    } catch (err) {
      console.error('감정 업데이트 실패:', err);
      Alert.alert('오류', '감정 업데이트에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <Text style={styles.subtitle}>Choose your current emotion</Text>

      <View style={styles.characterContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>

        <Image source={emotion.image} style={styles.character} resizeMode="contain" />

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.emotionText, { color: emotion.color }]}>
        {emotion.label}
      </Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSelect}>
          <Text style={styles.primaryText}>I choose this</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F0ED',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#2E2E2E',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 24,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 20,
  },
  arrow: {
    fontSize: 40,
    color: '#888',
    paddingHorizontal: 16,
  },
  character: {
    width: 220,
    height: 250,
    alignSelf: 'center',
    marginBottom: 16,
    marginLeft: 14,
  },
  emotionText: {
    fontSize: 33,
    fontWeight: '700',
    marginBottom: 32,
    letterSpacing: 0.6,
  },
  buttonWrapper: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#2E2E2E',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  primaryText: {
    fontFamily: 'Pretendard-Regular',
    color: '#FFF',
    fontSize: 17.7,
    fontWeight: 'bold',
  },
});

export default EmotionSelectScreen;
