import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView, Dimensions
} from 'react-native';
import api from '../../api/axios';
const { width,height } = Dimensions.get('window');
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
        <Icon name="bell" size={22} color="#EB6A39" />
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
          <Icon name="arrow-up-right" size={18} color="#F4F0ED" style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigate('Chat')}
          >
            <Text style={styles.buttonText}>Chat with Mind</Text>
            <Icon name="arrow-up-right" size={18} color="#F4F0ED" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => navigate('Archive')}
          >
            <Text style={styles.buttonText}>Mood Archive</Text>
            <Icon name="arrow-up-right" size={18} color="#F4F0ED" style={styles.arrowIcon} />
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
    paddingBottom: 100, 
  },
  topRightIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '500',
    color: '#2E2E2E',
    marginTop: 64,
    textAlign: 'left',
    maxWidth: 400,
    paddingLeft: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 44,
    lineHeight: 46,
    fontWeight: '500',
    color: '#2E2E2E',
    marginBottom: 32,
    textAlign: 'left',
    maxWidth: 420,
    paddingLeft: 10,
    letterSpacing: 0.5,
    paddingBottom: 10,
  },
  bold: {
    fontWeight: '700',
  },
  character: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 60,
    resizeMode: 'contain',
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  bigButton: {
    flex: 1,
    height: 300,
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
    gap: 16,
  },
  gridButton: {
    flex: 1,
    height: 116,
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
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'left',
    lineHeight: 22,
  },
  buttonTextMain: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'left',
    lineHeight: 30,
  },
  arrowIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  boosterWrapper: {
    marginTop: 40,
  },
  boosterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
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
  },
  boosterDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 4,
  },
});


export default MainScreen;
