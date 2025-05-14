// navigation/BottomTabBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const tabs = [
  { key: 'Archive', icon: 'email-outline', label: 'Archive' },
  { key: 'Diary', icon: 'pencil-outline', label: 'Mood Diary' },
  { key: 'Main', icon: 'home', label: 'Home' },
  { key: 'Calendar', icon: 'calendar-blank-outline', label: 'Calendar' },
  { key: 'MyPage', icon: 'account-circle-outline', label: 'My Page' },
];

const BottomTabBar = ({ currentTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.key)}
        >
          <Icon
            name={tab.icon}
            size={26}
            color={currentTab === tab.key ? '#F26B1F' : '#B3B3B3'}
          />
          <Text style={[
            styles.label,
            currentTab === tab.key && styles.labelActive
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 12,
    marginBottom: Platform.OS === 'ios' ? 0 : 0,  // ← Android에만 살짝 띄움
    elevation: 6, // Android 전용 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)'
  },
  tabItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 4, // 아이콘과 텍스트 간 여백
  },
  labelActive: {
    color: '#F26B1F',
    fontWeight: 'bold',
  },
});

export default BottomTabBar;