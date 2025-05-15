import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import api from '../../api/axios';

const LoadingScreen = ({ goTo, imageData, text }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // 애니메이션: 0% → 100%로 자연스럽게 증가
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000, // 5초 정도 걸리게 설정
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 50ms마다 +1%

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sendData = async () => {
      try {
        const res = await api.post('/diary', {
          image: imageData,
          text,
        });

        const { emotionType, suggestions = [], text: originalText } = res.data;

        // 1초 정도 딜레이 후 결과 화면으로 이동
      setTimeout(() => {
        goTo('Result', {
          emotion: emotionType || 'UNKNOWN',
          suggestions,
          originalText,
        });
      }, 500);
      } catch (err) {
        console.error('분석 실패:', err);
        // 실패 시에도 진행은 되게 하기
        setTimeout(() => {
          goTo('Result', { emotion: 'UNKNOWN', suggestions: [], originalText: text });
        }, 1000);
      }
    };

    sendData();
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>Mind is preparing for a diary reply and a picture.</Text>
      <Text style={styles.percent}>{percentage}%</Text>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.fill, { width: barWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  subText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  percent: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EA5E28',
    marginBottom: 16,
  },
  progressBar: {
    width: '80%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#EA5E28',
  },
});

export default LoadingScreen;
