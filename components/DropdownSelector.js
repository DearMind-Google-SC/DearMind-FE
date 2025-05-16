import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import down from '../assets/icons/chevron-down.png'; // 경로는 상황에 맞게 조정

const DropdownSelector = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.dropdownButton} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.dropdownText}>{label}</Text>
        <Image source={down} style={styles.downIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 19,
    marginRight: 8,
  },
  downIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
  },
});

export default DropdownSelector;
