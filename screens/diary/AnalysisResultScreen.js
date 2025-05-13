// screens/diary/AnalysisResultScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const emotionCharacterMap = {
  GLOOMY: require('../../assets/characters/gloomy.png'),
  ANXIOUS: require('../../assets/characters/anxious.png'),
  HAPPY: require('../../assets/characters/happy.png'),
  UNKNOWN: require('../../assets/characters/unknown.png'),
  // 추가 감정 캐릭터 필요시 확장
};

const AnalysisResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { emotion = 'UNKNOWN', suggestions = [], originalText } = route.params || {};

  const handleAgree = () => {
    navigation.navigate('RecommendationScreen', {
      emotion,
      suggestions,
    });
  };

  const handleDisagree = () => {
    navigation.navigate('EmotionSelectScreen', {
      originalEmotion: emotion,
      originalText,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={emotionCharacterMap[emotion] || emotionCharacterMap.UNKNOWN}
        style={styles.character}
        resizeMode="contain"
      />
      <Text style={styles.emotionText}>{emotion}</Text>
      <Text style={styles.description}>You seem {emotion.toLowerCase()} today. Is that right?</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={handleAgree}>
          <Text style={styles.buttonText}>That's right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleDisagree}>
          <Text style={[styles.buttonText, styles.secondaryText]}>I don't think so</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  character: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  emotionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'column',
    gap: 14,
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: '#000',
  },
});

export default AnalysisResultScreen;
