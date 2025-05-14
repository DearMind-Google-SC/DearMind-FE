import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen = () => {
  useEffect(() => {
    console.warn('⚠️ SettingsScreen is not implemented yet.');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Settings screen 준비 중입니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});

export default SettingScreen;
