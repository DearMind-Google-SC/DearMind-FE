import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Dimensions, 
  StyleSheet
} from 'react-native';
import dayjs from 'dayjs';
import api from '../../api/axios';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CalendarScreen = () => {
  const now = dayjs();
  const [selectedMonth, setSelectedMonth] = useState(now.month());
  const [selectedYear, setSelectedYear] = useState(now.year());
  const [emotionMap, setEmotionMap] = useState({});

  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [yearDropdownVisible, setYearDropdownVisible] = useState(false);

  const [monthDropdownTop, setMonthDropdownTop] = useState(0);
  const [yearDropdownTop, setYearDropdownTop] = useState(0);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const years = Array.from({ length: 13 }, (_, i) => now.year() - i);

  const firstDay = dayjs(`${selectedYear}-${selectedMonth + 1}-01`);
  const startWeekday = firstDay.day();
  const daysInMonth = firstDay.daysInMonth();
  const dayArray = Array(startWeekday).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const formatDate = (day) => {
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${selectedYear}-${monthStr}-${dayStr}`;
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'HAPPY': return '#FEE500';
      case 'SAD': return '#6B8E23';
      case 'ANGRY': return '#FF6B6B';
      case 'SURPRISED': return '#72C6F8';
      default: return '#ccc';
    }
  };

  useEffect(() => {
    const fetchMonthEmotionData = async () => {
      try {
        const res = await api.get('/diary/by-month', {
          params: { year: selectedYear, month: selectedMonth + 1 }
        });

        console.log('📦 월별 감정 데이터:', res.data); // ✅ 여기서 전체 구조 확인

        const map = {};
        const comboFetchList = [];

        for (const record of res.data) {
          const { date, emotions } = record;
          map[date] = { emotions };

          if (emotions.length > 1) {
            const fetchCombo = api
              .get('/diary/emotion-combo-icon-by-date', {
                params: { emotions }
              })
              .then((iconRes) => {
                map[date].iconUrl = iconRes.data.url;
              })
              .catch(() => {});
            comboFetchList.push(fetchCombo);
          }
        }

        await Promise.all(comboFetchList);
        setEmotionMap(map);
      } catch (err) {
        console.error('감정 기록 불러오기 실패:', err);
      }
    };

    fetchMonthEmotionData();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (monthDropdownVisible) {
      monthRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setMonthDropdownTop(pageY + h);
      });
    }
  }, [monthDropdownVisible]);

  useEffect(() => {
    if (yearDropdownVisible) {
      yearRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setYearDropdownTop(pageY + h);
      });
    }
  }, [yearDropdownVisible]);

  const renderDay = (day, index) => {
    if (!day) return <View key={index} style={styles.dayBox} />;

    const dateStr = formatDate(day);
    const record = emotionMap[dateStr];

    return (
      <View key={index} style={styles.dayBox}>
        {record ? (
          record.iconUrl ? (
            <Image source={{ uri: record.iconUrl }} style={styles.icon} />
          ) : (
            <View
              style={[
                styles.circle,
                { backgroundColor: getEmotionColor(record.emotions[0]) }
              ]}
            >
              <Text style={styles.dayText}>{day}</Text>
            </View>
          )
        ) : (
          <View style={styles.circle}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable ref={monthRef} onPress={() => setMonthDropdownVisible(true)} style={styles.dropdown}>
            <Text style={styles.dropdownText}>{MONTHS[selectedMonth]}</Text>
          </Pressable>
          <Pressable ref={yearRef} onPress={() => setYearDropdownVisible(true)} style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedYear}</Text>
          </Pressable>
        </View>
      </View>

      {(monthDropdownVisible || yearDropdownVisible) && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            setMonthDropdownVisible(false);
            setYearDropdownVisible(false);
          }}
        >
          <>
            {monthDropdownVisible && (
              <View style={[styles.dropdownModal, { top: monthDropdownTop, left: 20 }]}>
                <ScrollView>
                  {MONTHS.map((month, idx) => (
                    <Pressable key={month} onPress={() => {
                      setSelectedMonth(idx);
                      setMonthDropdownVisible(false);
                    }}>
                      <Text style={styles.dropdownItem}>{month}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
            {yearDropdownVisible && (
              <View style={[styles.dropdownModal, { top: yearDropdownTop, left: 140 }]}>
                <ScrollView>
                  {years.map((year) => (
                    <Pressable key={year} onPress={() => {
                      setSelectedYear(year);
                      setYearDropdownVisible(false);
                    }}>
                      <Text style={styles.dropdownItem}>{year}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        </Pressable>
      )}

      <View style={styles.weekHeader}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.weekday}>{day}</Text>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {dayArray.map((day, idx) => renderDay(day, idx))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F1EE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#FF8147',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dropdownText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdownModal: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 12,
    width: 140,
    maxHeight: 250,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});


export default CalendarScreen;
