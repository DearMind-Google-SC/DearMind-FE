import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView, Dimensions
} from 'react-native';
import api from '../../api/axios';
import BellIcon from '../../assets/icons/bell.png';
import ArrowIcon from '../../assets/icons/arrow-up-right.png';
/**
 * @param {{ navigate: (screen: string) => void }} props
 */
const MainScreen = ({ navigate }) => {
  const [boosters, setBoosters] = useState([]);
  const [userName, setUserName] = useState('');
  const [characterUri, setCharacterUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api.get('/selfcare/latest')
          .then((res) => {
            if (res.data?.length) setBoosters(res.data);
          })
          .catch((err) => {
            console.warn('Mood Booster not found (optional):', err?.response?.status);
          });

        // 필수 API들
        const [userRes, emotionRes] = await Promise.all([
          api.get('/auth/me'),
          api.get('/emotion-icon/today'),
        ]);

        if (userRes.data?.name) setUserName(userRes.data.name);
        if (emotionRes.status === 200 && emotionRes.data?.imageUrl) {
          setCharacterUri(emotionRes.data.imageUrl);
        }
      } catch (err) {
        console.error('MainScreen essential fetch error:', err);
        setUserName('Jun'); // fallback
        setCharacterUri(null);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRightIcon}>
        <Image source={BellIcon} style={styles.icon22} />
      </View>

      <Text style={styles.title}>Hello, {userName}.</Text>
      <Text style={styles.subtitle}>
        How do you feel{'\n'}about your <Text style={styles.bold}>current{'\n'}emotions?</Text>
      </Text>

      <Image
        source={
          characterUri
            ? { uri: characterUri }
            : require('../../assets/characters/unknown.png')
        }
        style={styles.character}
      />

      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.gridButton, styles.orange, styles.bigButton]}
          onPress={() => navigate('DiaryFromMain')}
        >
          <Text style={styles.buttonTextMain}>Draw{'\n'}with Mind</Text>
          <Image source={ArrowIcon} style={styles.arrowIconImage} />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigate('Chat')}
          >
            <Text style={styles.buttonText}>Chat with Mind</Text>
            <Image source={ArrowIcon} style={styles.arrowIconImage} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigate('Archive')}
          >
            <Text style={styles.buttonText}>Mood Archive</Text>
            <Image source={ArrowIcon} style={styles.arrowIconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {boosters.length > 0 && (
        <View style={styles.boosterWrapper}>
          <Text style={styles.boosterTitle}>Mood Boosters</Text>
          {boosters.map((item, idx) => (
            <View key={idx} style={styles.boosterCard}>
              <Text style={styles.boosterName}>{item.title}</Text>
              <Text style={styles.boosterDesc}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F0ED',
    padding: 24,
    paddingBottom:60, 
  },
  topRightIcon: {
    position: 'absolute',
    marginTop: 80,
    right: 30,
    zIndex: 10,
  },
  title: {
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '500',
    color: '#2E2E2E',
    marginTop: 45,
    textAlign: 'left',
    maxWidth: 400,
    paddingLeft: 10,
    letterSpacing: 0,
    fontFamily: 'Pretendard-Regular',
  },
  subtitle: {
    fontSize: 44,
    lineHeight: 46,
    fontWeight: '600',
    color: '#2E2E2E',
    marginBottom: 22,
    textAlign: 'left',
    maxWidth: 420,
    paddingLeft: 12,
    letterSpacing: 0,
    paddingBottom: 10,
    fontFamily: 'Pretendard-Regular',
  },
  bold: {
    fontWeight: '800',
  },
  character: {
    width: 220,
    height: 250,
    alignSelf: 'center',
    marginBottom: 40,
    resizeMode: 'contain',
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 40,
  },
  bigButton: {
    flex: 1,
    height: 260,
    justifyContent: 'center',
    backgroundColor: '#FF5900',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 5,
  },
  gridButton: {
    flex: 1,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 12,
    position: 'relative',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'left',
    lineHeight: 22,
    fontFamily: 'Pretendard-Regular',
  },
  buttonTextMain: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 40,
    textAlign: 'left',
    lineHeight: 40,
    fontFamily: 'Pretendard-Regular',
  },
  arrowIconImage: {
    width: 34,
    height: 34,
    position: 'absolute',
    top: 14,
    right: 14,
    tintColor: '#F4F0ED',
  },
  boosterWrapper: {
    marginTop: 40,
  },
  boosterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
    fontFamily: 'Pretendard-Regular',
  },
  boosterCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  boosterName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#EB6A39',
    fontFamily: 'Pretendard-Regular',
  },
  boosterDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 4,
    fontFamily: 'Pretendard-Regular',
  },
  icon22: {
    width: 38,
    height: 38,
  },
});


export default MainScreen;
