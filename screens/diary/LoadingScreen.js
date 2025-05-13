// screens/diary/LoadingScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../api/axios'; // 이미 세팅된 axios 인스턴스

const LoadingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { imageData, text } = route.params || {};

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.post('/diary', {
          image: imageData,
          text,
        });

        const { emotion, suggestions } = response.data;

        navigation.replace('AnalysisResultScreen', {
          emotion,
          suggestions,
        });
      } catch (err) {
        console.error('분석 실패:', err);
        // 오류 시 fallback 처리
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>I'm analyzing your feelings...</Text>
      <ActivityIndicator size="large" color="#FF6F61" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default LoadingScreen;
