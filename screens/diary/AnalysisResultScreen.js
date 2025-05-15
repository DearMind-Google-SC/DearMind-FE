import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const emotionCharacterMap = {
  GLOOMY: require('../../assets/characters/gloomy.png'),
  ANXIOUS: require('../../assets/characters/anxious.png'),
  HAPPY: require('../../assets/characters/happy.png'),
  UNKNOWN: require('../../assets/characters/unknown.png'),
};

const AnalysisResultScreen = ({ goTo, emotion = 'UNKNOWN', suggestions = [], originalText = '' }) => {
  const handleAgree = () => {
    goTo('Recommend', { emotion }); // ✅ props 넘기기
  };

  const handleDisagree = () => {
    goTo('EmotionSelect', { originalEmotion: emotion, originalText });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you okay?</Text>
      <Text style={styles.subtitle}>You seem {emotion.toLowerCase()} today.</Text>

      <View style={styles.characterContainer}>
        <Text style={styles.arrow}>{'<'}</Text>
        <Image
          source={emotionCharacterMap[emotion] || emotionCharacterMap.UNKNOWN}
          style={styles.character}
          resizeMode="contain"
        />
        <Text style={styles.arrow}>{'>'}</Text>
      </View>

      <Text style={[styles.emotionText, emotion === 'GLOOMY' && { color: '#8673FF' }]}>
        {emotion}
      </Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleAgree}>
          <Text style={styles.primaryText}>That's right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleDisagree}>
          <Text style={styles.secondaryText}>I don’t think so</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 24,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 12,
  },
  arrow: {
    fontSize: 24,
    color: '#888',
  },
  character: {
    width: 160,
    height: 160,
  },
  emotionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonWrapper: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AnalysisResultScreen;
