import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import api from '../../api/axios';
import ArchiveCard from '../../components/ArchiveCard';
import DropdownSelector from '../../components/DropdownSelector';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const YEARS = Array.from({ length: 10 }, (_, i) => dayjs().year() - i);

const ArchiveHomeScreen = ({ goTo }) => {
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

        const params = { year: selectedYear, month: selectedMonth + 1 };

        const res = tab === 'my'
          ? await api.get('/diary/by-month', { params })
          : await api.get('/reward/monthly', { params });
        console.log('Archive 불러오기 성공:', res.data);

        setDiaryList(res.data);
      } catch (e) {
        console.error('Archive 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchive(); // ✅ 반드시 호출 필요
  }, [tab, selectedMonth, selectedYear]);

  const renderItem = ({ item }) => (
    <ArchiveCard
      image={{ uri: item.imageUrl }}
      date={dayjs(item.createdAt).format('MMMM D, YYYY')}
      summary={(item.summary || (item.text && item.text.slice(0, 30))) || ''}
      onPress={() => {
        if (tab === 'my') {
          goTo('DiaryDetail', item.id);
        } else {
          goTo('ReplyDetail', item.id);
        }
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable onPress={() => setTab('my')} style={[styles.tab, tab === 'my' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'my' && styles.tabTextActive]}>My Diary</Text>
        </Pressable>
        <Pressable onPress={() => setTab('reply')} style={[styles.tab, tab === 'reply' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'reply' && styles.tabTextActive]}>Mind's Reply</Text>
        </Pressable>
      </View>

      <View style={styles.tabUnderline} />

      <View style={styles.dropdownContainer}>
        <DropdownSelector
          label={MONTHS[selectedMonth].slice(0, 3)}
          onPress={() => setMonthModalVisible(true)}
        />
        <DropdownSelector
          label={selectedYear}
          onPress={() => setYearModalVisible(true)}
        />
      </View>

      <FlatList
        data={diaryList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
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
  container: { flex: 1, backgroundColor: '#FDF8F3', paddingHorizontal: 16, paddingTop: 30 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: { paddingVertical: 8, paddingHorizontal: 16 },
  tabActive: {},
  tabText: {
    fontSize: 24,
    color: '#B9b6b4',
    marginBottom: 8,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
  },
  tabTextActive: {
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
  },
  tabUnderline: { height: 1, backgroundColor: '#ccc', marginTop: 4, marginBottom: 30 },
  dropdownContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
    rowGap: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    backgroundColor: 'white',
    margin: 40,
    padding: 20,
    borderRadius: 8,
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export default ArchiveHomeScreen;
