import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const SplashScreen = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTop}>Dear</Text>
        <Text style={styles.titleBottom}>Mind</Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonDark}
          onPress={() => navigate('SignUp')}
        >
          <Text style={styles.buttonTextLight}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLight}
          onPress={() =>{
            console.log('Login pressed');
            navigate('Login')}
          } 
        >
          <Text style={styles.buttonTextDark}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EE',
    alignItems: 'center',
    paddingVertical: height * 0.12,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleTop: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    marginBottom: -8,
  },
  titleBottom: {
    fontSize: 64,
    fontWeight: '900',
    color: '#111',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 32,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonLight: {
    backgroundColor: '#fff',
    paddingVertical: 16,
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
