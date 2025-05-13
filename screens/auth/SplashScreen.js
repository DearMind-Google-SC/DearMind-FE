import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleTop}>Dear</Text>
      <Text style={styles.titleBottom}>Mind</Text>

      <TouchableOpacity
        style={styles.buttonDark}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonTextLight}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLight}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonTextDark}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleTop: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    marginBottom: -10,
  },
  titleBottom: {
    fontSize: 64,
    fontWeight: '900',
    color: '#111',
    marginBottom: 60,
  },
  buttonDark: {
    backgroundColor: '#111',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 32,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonLight: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 32,
    width: '80%',
    alignItems: 'center',
  },
  buttonTextLight: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDark: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SplashScreen;
