import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const CARD_HEIGHT = Dimensions.get('window').height / 3.6
console.log('CARD_HEIGHT:', CARD_HEIGHT);

const ArchiveCard = ({ image, date, summary, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <View style={styles.textBox}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.summary} numberOfLines={2}>{summary}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    borderRadius: 14,
    backgroundColor: '#F7F5F3',
    overflow: 'hidden',
    margin: 6,
    borderWidth: 1,
    borderColor: '#E0DCD6',
  },
  image: {
    width: '100%',
    height: '70%',
    backgroundColor: '#F7F5F3',
  },
  textBox: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  date: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 2,
    lineHeight: 28,
    fontFamily: 'Pretendard-Regular',
  },
  summary: {
    fontSize: 13,
    color: '#555',
    lineHeight: 17,
  },
});

export default ArchiveCard;
