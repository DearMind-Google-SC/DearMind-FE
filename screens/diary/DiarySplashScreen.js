import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { format } from 'date-fns';
import api from '../../api/axios';
const { width, height } = Dimensions.get('screen');

const DiarySplashScreen = ({ goTo }) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  const [loading, setLoading] = useState(true);
  const [canWrite, setCanWrite] = useState(false); // 일기 없으면 true

  useEffect(() => {
    const checkDiary = async () => {
      try {
        const res = await api.get('/diary/by-date', {
          params: { date: today },
        });

        if (res.status === 200) {
          // 이미 일기 있음 → 바로 DrawingScreen으로 이동
          goTo('Drawing');
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setCanWrite(true); // 일기 없음 → 버튼 보여줌
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
      goTo('Drawing');
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
    backgroundColor: '#F4F0ED',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: '#B9B6B4',
    marginBottom: 4,
  },
  date: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 24,
  },
  image: {
    width: 220,
    height: 250,
    alignSelf: 'center',
    marginBottom: 16,
    marginLeft: 14,
  },
  emotion: {
    fontSize: 33,
    fontWeight: '700',
    color: '#B9B6B4',
    marginBottom: 32,
    letterSpacing: 0.6,
  },
  button: {
    backgroundColor: '#2E2E2E',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.02,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },

});

export default DiarySplashScreen;
