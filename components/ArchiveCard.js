import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ArchiveCard = ({ image, date, summary, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.summary} numberOfLines={2}>{summary}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
  },
  date: {
    fontWeight: 'bold',
    marginTop: 8,
    marginHorizontal: 8,
  },
  summary: {
    color: '#444',
    fontSize: 14,
    marginHorizontal: 8,
    marginBottom: 12,
  },
});

export default ArchiveCard;
