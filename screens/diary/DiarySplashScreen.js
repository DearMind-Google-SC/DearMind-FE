// screens/diary/DiarySplashScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import api from '../../api/axios';

const DiarySplashScreen = () => {
  const navigation = useNavigation();
  const today = format(new Date(), 'yyyy-MM-dd');

  const [loading, setLoading] = useState(true);
  const [canWrite, setCanWrite] = useState(false); // false: 작성 불가(이미 있음), true: 작성 가능

  useEffect(() => {
    const checkDiary = async () => {
      try {
        const res = await api.get('/diary/by-date', {
          params: { date: today },
        });

        if (res.status === 200) {
          // 이미 일기 있음 → Splash 건너뛰고 바로 DrawingScreen
          navigation.replace('DrawingScreen');
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // 일기 없음 → 화면 렌더링 후 버튼으로 이동
          setCanWrite(true);
        } else {
          Alert.alert('오류', '감정 기록을 확인할 수 없습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkDiary();
  }, []);

  const handlePress = () => {
    if (canWrite) {
      navigation.navigate('DrawingScreen');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today, I feel...</Text>
      <Text style={styles.date}>{format(new Date(), 'MMMM dd, yyyy')}</Text>

      <Image
        source={require('../../assets/characters/unknown.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.emotion}>UNKNOWN</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add a mood diary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 4,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  emotion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DiarySplashScreen;
