// screens/diary/EmotionSelectScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EMOTIONS = [
  {
    id: 'HAPPY',
    label: 'HAPPY',
    color: '#7ECF6E',
    image: require('../../assets/characters/happy.png'),
  },
  {
    id: 'GLOOMY',
    label: 'GLOOMY',
    color: '#9A8FFF',
    image: require('../../assets/characters/gloomy.png'),
  },
  {
    id: 'ANXIOUS',
    label: 'ANXIOUS',
    color: '#E8AA4C',
    image: require('../../assets/characters/anxious.png'),
  },
  {
    id: 'ANGRY',
    label: 'ANGRY',
    color: '#E25A4A',
    image: require('../../assets/characters/angry.png'),
  },
];

const EmotionSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { originalText } = route.params || {};

  const [index, setIndex] = useState(0);
  const emotion = EMOTIONS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % EMOTIONS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + EMOTIONS.length) % EMOTIONS.length);
  };

  const handleSelect = () => {
    navigation.replace('RecommendationScreen', {
      emotion: emotion.id,
      suggestions: ['Try deep breathing', 'Take a walk', 'Write your thoughts'], // 임시 추천
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How are you feeling?</Text>
      <Text style={styles.subtext}>Choose your current emotion</Text>

      <View style={styles.characterWrapper}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrow}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.characterBlock}>
          <Image source={emotion.image} style={styles.characterImage} />
          <Text style={[styles.emotionLabel, { color: emotion.color }]}>
            {emotion.label}
          </Text>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.arrow}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
        <Text style={styles.selectText}>I chose it</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  characterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  arrow: {
    paddingHorizontal: 20,
  },
  arrowText: {
    fontSize: 28,
    color: '#888',
  },
  characterBlock: {
    alignItems: 'center',
    width: 180,
  },
  characterImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  emotionLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  selectButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  selectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmotionSelectScreen;
