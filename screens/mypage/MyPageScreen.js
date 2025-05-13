import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/axios'; // api.js에서 api를 import합니다.

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
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

    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {/* 프로필 헤더 */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.name}>Jun</Text>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Text style={styles.settingText}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* 명언 카드 */}
      <View style={styles.quoteCard}>
        <Text style={styles.quote}>{`“${quote}”`}</Text>
        {author ? <Text style={styles.author}>{`- ${author} -`}</Text> : null}
      </View>

      {/* 메뉴 목록 */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.menuText}>My Mood Boosters</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ArchiveHomeScreen')}>
        <Text style={styles.menuText}>My Mood Archives</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DiarySplashScreen')}>
        <Text style={styles.menuText}>My Mood Diaries</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: 'bold' },
  settingButton: { position: 'absolute', top: 0, right: 10, padding: 8 },
  settingText: { fontSize: 20 },
  quoteCard: {
    backgroundColor: '#FEC868',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  quote: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 8 },
  author: { fontSize: 12, fontWeight: 'bold' },
  menuItem: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 16,
  },
  menuText: { fontSize: 16, color: '#333' },
});

export default MyPageScreen;
