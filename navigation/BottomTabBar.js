import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

const tabs = [
  { key: 'Archive', icon: require('../assets/icons/folder-heart.png'), label: 'Archive' },
  { key: 'Diary', icon: require('../assets/icons/pen-line.png'), label: 'Mood Diary' },
  { key: 'Main', icon: require('../assets/icons/house.png'), label: 'Home' },
  { key: 'Calendar', icon: require('../assets/icons/calendar-days.png'), label: 'Calendar' },
  { key: 'MyPage', icon: require('../assets/icons/user.png'), label: 'My Page' },
];

const BottomTabBar = ({ currentTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => {
        const isActive = currentTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
          >
            <Image
              source={tab.icon}
              style={[
                styles.icon,
                isActive && styles.iconActive
              ]}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    tintColor: '#B9B6B4',
  },
  iconActive: {
    tintColor: '#FF5900',
  },
  label: {
    fontSize: 11,
    color: '#B3B3B3',
    marginTop: 4,
  },
  labelActive: {
    color: '#F26B1F',
    fontWeight: 'bold',
  },
});

export default BottomTabBar;
