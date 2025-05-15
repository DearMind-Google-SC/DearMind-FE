import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import api from '../../api/axios';

const RecommendationScreen = ({ goTo, exitDiary, emotion = 'UNKNOWN' }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await api.post(`/selfcare/recommend?emotion=${emotion}`);
        setSuggestions(res.data.recommended || []);
      } catch (err) {
        console.error('추천 활동 불러오기 실패:', err);
        Alert.alert('Oops', '추천 활동을 불러오지 못했어요.');
      }
    };

    if (emotion !== 'UNKNOWN') {
      fetchSuggestions();
    }
  }, [emotion]);

  const handleComplete = () => {
    exitDiary(); // 상위 탭으로 전환
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.split(' ')[0]} {item.split(' ')[1]}
      </Text>
      <Text style={styles.cardSubtitle}>
        {item}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        I’ll suggest activities to{'\n'}help take care of your feelings.
      </Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF8',
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
  },
  header: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  list: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA5E28',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RecommendationScreen;
