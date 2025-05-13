import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/axios';

const MainScreen = () => {
  const navigation = useNavigation();
  const [boosters, setBoosters] = useState([]);
  const [userName, setUserName] = useState('');
  const [characterUri, setCharacterUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boosterRes, userRes, emotionRes] = await Promise.all([
          api.get('/selfcare/latest'),
          api.get('/auth/me'),
          api.get('/emotion-icon/today'),
        ]);

        if (boosterRes.data?.length) setBoosters(boosterRes.data);
        if (userRes.data?.name) setUserName(userRes.data.name);
        if (emotionRes.status === 200 && emotionRes.data?.imageUrl) {
          setCharacterUri(emotionRes.data.imageUrl);
        }
      } catch (err) {
        console.error('MainScreen fetch error:', err);
        setUserName('Jun'); // fallback
        setCharacterUri(null); // fallback to local image
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 알림 아이콘 */}
      <View style={styles.topRightIcon}>
        <Icon name="bell" size={22} color="#EB6A39" />
      </View>

      {/* 텍스트 */}
      <Text style={styles.title}>Hello, {userName}.</Text>
      <Text style={styles.subtitle}>
        How do you feel{'\n'}about your <Text style={styles.bold}>current emotions?</Text>
      </Text>

      {/* 캐릭터 이미지 */}
      <Image
        source={
          characterUri
            ? { uri: characterUri }
            : require('../../assets/characters/unknown.png')
        }
        style={styles.character}
      />

      {/* 버튼들 */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.gridButton, styles.orange, styles.bigButton]}
          onPress={() => navigation.navigate('DrawingScreen')}
        >
          <Text style={styles.buttonText}>Draw with Mind</Text>
          <Icon name="arrow-up-right" size={18} color="#fff" style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <Text style={styles.buttonText}>Chat with Mind</Text>
            <Icon name="arrow-up-right" size={18} color="#fff" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigation.navigate('ArchiveHomeScreen')}
          >
            <Text style={styles.buttonText}>Mood Archive</Text>
            <Icon name="arrow-up-right" size={18} color="#fff" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 부스터 (선택 사항) */}
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
    padding: 24,
    backgroundColor: '#F9F6F3',
    paddingBottom: 80,
  },
  topRightIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 48,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700',
  },
  character: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  bigButton: {
    flex: 1,
    height: 212,
    justifyContent: 'center',
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 12,
  },
  gridButton: {
    flex: 1,
    height: 100,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  orange: {
    backgroundColor: '#EB6A39',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
  arrowIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  boosterWrapper: {
    marginTop: 30,
  },
  boosterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  boosterCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  boosterName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#EB6A39',
  },
  boosterDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 4,
  },
});

export default MainScreen;
