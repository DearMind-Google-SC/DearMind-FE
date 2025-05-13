import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  Alert, CheckBox, Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';
import useAuthStore from '../../store/useAuthStore';

const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', idToken);
      await api.post('/auth/login', { idToken });
      login();
      Alert.alert('로그인 성공', '서버로 idToken 전송 완료!');
    } catch (error) {
      console.error(error);
      Alert.alert('에러', error.message);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.subtitle}>Please enter your details to start with us.</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../../assets/images/google-logo.png')}
          style={styles.googleLogo}
        />
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.rememberRow}>
        <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
            {remember && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.12, // 상단에서 12%부터 시작
    paddingHorizontal: 24,
    backgroundColor: '#F4F0ED',
  },
  welcome: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
    color: '#2E2E2E',
    textAlign: 'center',
    marginBottom: Dimensions.get('window').height * 0.0065,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(51, 51, 51, 0.7)',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: Dimensions.get('window').height * 0.0296,
    lineHeight: 19,
  },
  googleButton: {
    alignSelf: 'center',
    marginBottom: Dimensions.get('window').height * 0.035,
    marginTop: Dimensions.get('window').height * 0.035,
  },
  googleLogo: {
    width: width * 0.08,  // 40 / 375 = 0.106 (375 기준 비율)
    height: width * 0.08,
    resizeMode: 'contain',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.0296,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
  },
  inputContainer: {
    marginBottom: Dimensions.get('window').height * 0.0197,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontFamily: 'Pretendard-Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Pretendard-Regular',
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.0345,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4, // ← 살짝 둥글게
    borderWidth: 1.5,
    borderColor: '#d97706',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#d97706',
  },
  checkmark: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18, // 세로 가운데 정렬 자연스럽게
  },
  rememberText: {
    color: '#d97706',
    fontSize: 14,
    fontWeight: '500',
  },
  forgot: {
    color: '#333',
  },
  bottomSection: {
    position: 'absolute',
    bottom: height * 0.08, // 하단에서 8% 위
    left: 24,
    right: 24,
  },
  loginButton: {
    backgroundColor: '#FFF',
    paddingVertical: Dimensions.get('window').height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.0197,
  },
  loginText: {
    color: '#2E2E2E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupRow: {
    color: '#2E2E2E',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    color: '#ff5900',
    fontWeight: '600',
  },
});
