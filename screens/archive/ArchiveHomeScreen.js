import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import dayjs from 'dayjs';
import api from '../../api/axios';
import ArchiveCard from '../../components/ArchiveCard';
import { useNavigation } from '@react-navigation/native';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const YEARS = Array.from({ length: 10 }, (_, i) => dayjs().year() - i); // 최근 10년

const ArchiveHomeScreen = () => {
  const navigation = useNavigation();
  const now = dayjs();
  const [tab, setTab] = useState('my');
  const [selectedMonth, setSelectedMonth] = useState(now.month());
  const [selectedYear, setSelectedYear] = useState(now.year());
  const [diaryList, setDiaryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        setIsLoading(true);
        const res = tab === 'my'
          ? await api.get('/diary', {
              params: { year: selectedYear, month: selectedMonth + 1 },
            })
          : await api.get('/reward', {
              params: { year: selectedYear, month: selectedMonth + 1 },
            });
        setDiaryList(res.data);
      } catch (e) {
        console.error('Archive 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchive();
  }, [tab, selectedMonth, selectedYear]);

  const renderItem = ({ item }) => (
  <ArchiveCard
    image={{ uri: item.imageUrl }}
    date={dayjs(item.createdAt).format('MMMM D, YYYY')}
    summary={(item.summary || (item.text && item.text.slice(0, 30))) || ''}
    onPress={() => {
      if (tab === 'my') {
        navigation.navigate('DiaryDetailScreen', { id: item.id });
      } else {
        navigation.navigate('ReplyDetailScreen', { id: item.id });
      }
    }}
  />
);


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable onPress={() => setTab('my')} style={[styles.tab, tab === 'my' && styles.tabActive]}>
          <Text style={styles.tabText}>My Diary</Text>
        </Pressable>
        <Pressable onPress={() => setTab('reply')} style={[styles.tab, tab === 'reply' && styles.tabActive]}>
          <Text style={styles.tabText}>Mind's Reply</Text>
        </Pressable>
      </View>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={() => setMonthModalVisible(true)}>
          <Text>{MONTHS[selectedMonth]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setYearModalVisible(true)}>
          <Text>{selectedYear}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={diaryList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        onRefresh={() => {}}
      />

      {/* Month Modal */}
      <Modal visible={monthModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            {MONTHS.map((month, index) => (
              <TouchableOpacity
                key={month}
                onPress={() => {
                  setSelectedMonth(index);
                  setMonthModalVisible(false);
                }}>
                <Text style={styles.modalItem}>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal visible={yearModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => {
                  setSelectedYear(year);
                  setYearModalVisible(false);
                }}>
                <Text style={styles.modalItem}>{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  tab: { paddingVertical: 8, paddingHorizontal: 16 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: 'orange' },
  tabText: { fontSize: 16 },
  dropdownContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  list: { gap: 16 },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modal: { backgroundColor: 'white', margin: 40, padding: 20, borderRadius: 8 },
  modalItem: { fontSize: 18, paddingVertical: 8, textAlign: 'center' },
});

export default ArchiveHomeScreen;
