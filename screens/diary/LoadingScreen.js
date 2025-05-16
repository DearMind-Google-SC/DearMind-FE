import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import api from '../../api/axios';
import leftarray from '../../assets/icons/leftarray.png';

const LoadingScreen = ({ goTo, imageData, text }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 8000,
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
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      const sendData = async () => {
        let savedRecordId = null;

        try {
          const res = await api.post('/diary', {
            image: imageData,
            text,
          });

          const { emotionType, suggestions = [], text: originalText, recordId } = res.data;
          savedRecordId = recordId;

          console.log('백엔드 결과값:', res.data);

          setTimeout(() => {
            progress.setValue(1);
            goTo('Result', {
              emotion: emotionType || 'UNKNOWN',
              suggestions,
              originalText,
              recordId,
            });
          }, 500);
        } catch (err) {
          console.error('분석 실패:', err);

          setTimeout(() => {
            goTo('Result', {
              emotion: 'UNKNOWN',
              suggestions: [],
              originalText: text,
              recordId: savedRecordId || '', // fallback에도 안전하게 넘김
            });
          }, 500);
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
      <Image source={leftarray} style={styles.leftIcon} />
      <Text style={styles.subText}>{`Just a moment,\nI’m looking into your feelings.`}</Text>
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
  leftIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    width: 30,
    height: 30,
    marginBottom: 20,
    marginLeft: 10,
    color: '#2E2E2E',
  },
  subText: {
    fontSize: 26,
    color: '#2e2e2e',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '500',
  },
  percent: {
    fontSize: 200,
    fontWeight: '900',
    color: '#ff5900',
    marginBottom: 16,
    fontFamily: 'Pretendard-Bold',
    letterSpacing: -15,
  },
  progressBar: {
    width: '80%',
    height: 20,
    borderRadius: 100,
    backgroundColor: '#fefefe',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#b9b6b4',
  },
});

export default LoadingScreen;
