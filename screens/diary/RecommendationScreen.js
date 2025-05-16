import React, { useEffect, useState } from 'react';
import {  Image, Dimensions, View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import api from '../../api/axios';
import MoveLeftIcon from '../../assets/icons/leftarray.png';
import MoodBoosterCard from '../../components/MoodBoosterCard';

const { height } = Dimensions.get('screen');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={goBack} style={styles.backBtn}> */}
          <Image source={MoveLeftIcon} style={styles.backIcon} />
        {/* </TouchableOpacity> */}

        <Text style={styles.headerText}>
          I’ll suggest activities to{'\n'}help take care of your feelings.
        </Text>
      </View>
      <View style={styles.cardListWrapper}>
        <FlatList
          data={suggestions}
          renderItem={({ item }) => <MoodBoosterCard text={item} />}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4F1',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  backBtn: {
    marginBottom: 12,
    marginLeft: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#333',
  },
  headerText: {
    fontSize: 24,
    color: '#2E2E2E',
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.2,
    fontFamily: 'Pretendard-Regular',
    marginTop: 60,
    marginBottom: 10,
  },
  cardListWrapper: {
    flexGrow: 1,
    paddingTop: 4,
    paddingBottom: 26,
  },
  button: {
    backgroundColor: '#2E2E2E',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 180,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
});

export default RecommendationScreen;
