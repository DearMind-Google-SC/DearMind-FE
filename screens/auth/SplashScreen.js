import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Title from '../../assets/images/dear-mind.png';

const { height } = Dimensions.get('screen');

const SplashScreen = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Image
          source={Title}
          style={styles.titleImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonDark}
          onPress={() => navigate('SignUp')}
        >
          <Text style={styles.buttonTextLight}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLight}
          onPress={() => navigate('Login')}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleImage: {
    width: 450,
    height: 310,
    marginTop: 20,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: height * 0.1,
    gap: 5,
  },
  buttonDark: {
    backgroundColor: '#111',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonLight: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextLight: {
    color: '#fff',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
  buttonTextDark: {
    color: '#111',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
});

export default SplashScreen;
