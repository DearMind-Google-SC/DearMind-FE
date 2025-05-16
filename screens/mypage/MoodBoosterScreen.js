import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import api from '../../api/axios';
import MoodBoosterCard from '../../components/MoodBoosterCard';
import MoveLeftIcon from '../../assets/icons/leftarray.png';

const { height } = Dimensions.get('screen');
const MoodBoosterScreen = ({ goBack, navigate }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/selfcare/latest');
        setRecommendations(res.data?.recommended || []);
      } catch (err) {
        console.error('무드부스터 불러오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Image source={MoveLeftIcon} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Here’s your recommended{'\n'}mood booster for today.
        </Text>
      </View>

      <View style={styles.cardListWrapper}>
        <FlatList
          data={recommendations}
          renderItem={({ item }) => <MoodBoosterCard text={item} />}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
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
});

export default MoodBoosterScreen;
