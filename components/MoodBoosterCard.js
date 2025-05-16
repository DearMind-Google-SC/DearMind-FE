import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @param {{ text: string }} props
 */
const MoodBoosterCard = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  text: {
    color: '#FF5900',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 25,
    letterSpacing: 0.2,
    paddingHorizontal:5,
  },

});

export default MoodBoosterCard;