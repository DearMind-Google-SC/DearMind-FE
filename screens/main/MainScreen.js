import React, { useEffect, useState } from 'react';
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
  const [userName, setUserName] = useState(''); // 추후 /auth/me 연동 가능

  useEffect(() => {
    const fetchBoosters = async () => {
      try {
        const res = await api.get('/selfcare/latest');
        if (res.data && res.data.length) setBoosters(res.data);
      } catch (err) {
        console.error('Booster fetch error:', err);
      }

    // 임시 사용자 이름 (나중에 /auth/me로 대체)
    setUserName('Jun');
    };
    
    fetchBoosters();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello, {userName}.</Text>
      <Text style={styles.subtitle}>
        How do you feel about your <Text style={styles.bold}>current emotions?</Text>
      </Text>

      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.gridButton, styles.orange]}
          onPress={() => navigation.navigate('DrawingScreen')}
        >
          <Text style={styles.buttonText}>Draw with Mind</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('ChatScreen')}
        >
          <Text style={styles.buttonText}>Chat with Mind</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('ArchiveHomeScreen')}
        >
          <Text style={styles.buttonText}>Mood Archive</Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 60,
    backgroundColor: '#F9F6F3',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
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
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  gridButton: {
    width: '48%',
    height: 100,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  boosterWrapper: {
    marginTop: 10,
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
