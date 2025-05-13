import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import api from '../../api/axios';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CalendarScreen = () => {
  const now = dayjs();
  const navigation = useNavigation();

  const [selectedMonth, setSelectedMonth] = useState(now.month());
  const [selectedYear, setSelectedYear] = useState(now.year());
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  const [isYearModalVisible, setYearModalVisible] = useState(false);
  const [recordedDates, setRecordedDates] = useState(new Set());

  const firstDay = dayjs(`${selectedYear}-${selectedMonth + 1}-01`);
  const startWeekday = firstDay.day();
  const daysInMonth = firstDay.daysInMonth();

  const dayArray = Array(startWeekday).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const years = Array.from({ length: 12 }, (_, i) => now.year() - i);

  useEffect(() => {
    const fetchDiaryDates = async () => {
      try {
        const res = await api.get('/diary/dates');
        setRecordedDates(new Set(res.data));
      } catch (err) {
        console.error('감정 기록 날짜 불러오기 실패:', err);
      }
    };
    fetchDiaryDates();
  }, []);

  const formatDate = (day) => {
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${selectedYear}-${monthStr}-${dayStr}`;
  };

  const renderDay = (day, index) => {
  const isRecorded = day && recordedDates.has(formatDate(day));
  return (
    <TouchableOpacity key={index} style={styles.dayBox} disabled={!day}>
      <View style={[
        styles.circle,
        !day ? styles.empty : null,
        isRecorded ? { backgroundColor: '#FEC868' } : null
      ]}>
        <Text style={styles.dayText}>{day || ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      {/* 상단 드롭다운 + 분석 버튼 */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={() => setMonthModalVisible(true)} style={styles.dropdown}>
            <Text>{MONTHS[selectedMonth]}</Text>
          </Pressable>
          <Pressable onPress={() => setYearModalVisible(true)} style={styles.dropdown}>
            <Text>{selectedYear}</Text>
          </Pressable>
        </View>
        <Button
          title="통계 보기"
          onPress={() =>
            navigation.navigate('CalendarChartScreen', {
              year: selectedYear,
              month: selectedMonth + 1,
            })
          }
        />
      </View>

      {/* 모달: 월 선택 */}
      <Modal visible={isMonthModalVisible} transparent>
        <View style={styles.modal}>
          {MONTHS.map((month, idx) => (
            <Pressable key={month} onPress={() => {
              setSelectedMonth(idx);
              setMonthModalVisible(false);
            }}>
              <Text style={styles.modalItem}>{month}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>

      {/* 모달: 연도 선택 */}
      <Modal visible={isYearModalVisible} transparent>
        <View style={styles.modal}>
          {years.map((year) => (
            <Pressable key={year} onPress={() => {
              setSelectedYear(year);
              setYearModalVisible(false);
            }}>
              <Text style={styles.modalItem}>{year}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>

      {/* 요일 헤더 */}
      <View style={styles.weekHeader}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.weekday}>{day}</Text>
        ))}
      </View>

      {/* 날짜 그리드 */}
      <View style={styles.daysContainer}>
        {dayArray.map((day, idx) => renderDay(day, idx))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  dropdown: { padding: 8, borderWidth: 1, borderRadius: 8 },
  modal: { backgroundColor: 'white', marginTop: 100, marginHorizontal: 40, borderRadius: 10, padding: 16 },
  modalItem: { padding: 8 },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  weekday: { width: '14.2%', textAlign: 'center', fontWeight: '600' },
  daysContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  dayBox: { width: '14.2%', alignItems: 'center', marginVertical: 4 },
  circle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  empty: { backgroundColor: 'transparent' },
  dayText: { color: 'black' },
});

export default CalendarScreen;
