import React from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const emotionCharacterMap = {
  GLOOMY: require('../../assets/characters/gloomy.png'),
  ANXIOUS: require('../../assets/characters/anxious.png'),
  HAPPY: require('../../assets/characters/happy.png'),
  UNKNOWN: require('../../assets/characters/unknown.png'),
};

const emotionColorMap = {
  GLOOMY: '#7a7eff',
  HAPPY: '#58c663',
  ANXIOUS: '#ffa63f',
  ANGRY: '#Ed3b3b',
  UNKNOWN: '#b9b6b4',
};

const AnalysisResultScreen = ({
  goTo,
  emotion = 'UNKNOWN',
  suggestions = [],
  originalText = '',
  recordId = '',
}) => {
  const handleAgree = () => {
    goTo('Recommend', { emotion });
  };

  const handleDisagree = () => {
    goTo('EmotionSelect', {
      originalEmotion: emotion,
      recordId, // ✅ 반드시 넘겨줘야 EmotionSelect에서 PATCH 가능
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you okay?</Text>
      <Text style={styles.subtitle}>You seem {emotion.toLowerCase()} today.</Text>

      <View style={styles.characterContainer}>
        <Image
          source={emotionCharacterMap[emotion] || emotionCharacterMap.UNKNOWN}
          style={styles.character}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.emotionText, { color: emotionColorMap[emotion] || '#b9b6b4' }]}>
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
    gap: 0,
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
  secondaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  secondaryText: {
    color: '#2E2E2E',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
});

export default AnalysisResultScreen;
