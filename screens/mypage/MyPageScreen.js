import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import api from '../../api/axios';
import setting from '../../assets/icons/setting.png';
import rightArrow from '../../assets/icons/right.png';

const { width } = Dimensions.get('window');

const MyPageScreen = ({ goTo }) => {
  const [quote, setQuote] = useState('Something went wrong');
  const [author, setAuthor] = useState('');
  const [userName, setUserName] = useState('Jun'); // 기본값 Jun

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data?.name) setUserName(res.data.name);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await api.get('/emotion-quote/today');
        setQuote(res.data.quote);
        setAuthor(res.data.author);
      } catch (err) {
        console.error('명언 조회 실패:', err);
        setQuote('오늘의 명언을 불러올 수 없습니다.');
      }
    };

    fetchUserInfo();
    fetchQuote();
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pinimg.com/originals/46/d6/38/46d638b0018a29d734eac03973536c68.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}> {userName} </Text>
          <TouchableOpacity style={styles.settingButton} onPress={() => goTo('Settings')}>
            <Image source={setting} style={styles.settingIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText} numberOfLines={3}>
            “{quote}”
          </Text>
          {author ? <Text style={styles.authorText}>- {author} -</Text> : null}
        </View>

        {/* 메뉴 */}
        <TouchableOpacity style={[styles.menuItem,styles.menuItemFirst]} onPress={() => goTo('MoodBooster')}>
          <Text style={styles.menuText}>My Mood Boosters</Text>
          <Image source={rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => goTo('MoodArchive')}>
          <Text style={styles.menuText}>My Mood Archives</Text>
          <Image source={rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => goTo('MoodDiary')}>
          <Text style={styles.menuText}>My Mood Diaries</Text>
          <Image source={rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F4F1',
  },
  scrollContent: {
    paddingHorizontal: width * 0.06,
    paddingBottom: 40,
  },
  profileContainer: {
    height: width * 0.65,
    marginBottom: 24,
    position: 'relative',
  },
  profileImage: {
    width: '120%',
    marginLeft: -width * 0.06,
    height: width * 0.65,
  },
  name: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 20,
    fontSize: 33,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Pretendard-Regular',
    alignSelf: 'center',
  },
  settingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  settingIcon: {
    width: 35,
    height: 35,
    color: '#B9B6B4',
  },
  quoteCard: {
    backgroundColor: '#F27838',
    borderRadius: 12,
    height: 220,
    paddingHorizontal: 16,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Recoleta',
    textAlign: 'center',
    lineHeight: 30,
    maxWidth: '90%',
    fontWeight: '400',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Recoleta',
    fontWeight: '400',
    marginTop: 8,
  },
  menuItemFirst: {
    borderTopWidth: 1.3,
    borderColor: '#B9B6B4',
  },
  menuItem: {
    borderBottomWidth: 1.3,
    borderColor: '#B9B6B4',
    paddingVertical: 20,
    position: 'relative',
  },
  menuText: {
    fontSize: 22,
    color: '#2E2E2E',
    fontWeight: '500',
    lineHeight: 32,
    fontFamily: 'Pretendard-Regular',
  },
  rightArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: +5 }],
    width: 30,
    height: 30,
    tintColor: '#B9B6B4',
  },
});

export default MyPageScreen;
