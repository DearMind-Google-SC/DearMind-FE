// screens/diary/RecommendationScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const emotionCharacterMap = {
  GLOOMY: require('../../assets/characters/gloomy.png'),
  ANXIOUS: require('../../assets/characters/anxious.png'),
  HAPPY: require('../../assets/characters/happy.png'),
  UNKNOWN: require('../../assets/characters/unknown.png'),
};

const RecommendationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { emotion = 'UNKNOWN', suggestions = [] } = route.params || {};

  const handleComplete = () => {
    navigation.navigate('MainScreen'); // 또는 다른 종료 화면
  };

  return (
    <View style={styles.container}>
      <Image
        source={emotionCharacterMap[emotion] || emotionCharacterMap.UNKNOWN}
        style={styles.character}
        resizeMode="contain"
      />
      <Text style={styles.emotionText}>{emotion}</Text>
      <Text style={styles.message}>Maybe these can help you feel better 💡</Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>• {item}</Text>
          </View>
        )}
        contentContainerStyle={styles.suggestionList}
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F4',
    alignItems: 'center',
    padding: 24,
  },
  character: {
    width: 140,
    height: 140,
    marginBottom: 12,
  },
  emotionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  suggestionList: {
    width: '100%',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  suggestionItem: {
    marginVertical: 6,
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RecommendationScreen;
