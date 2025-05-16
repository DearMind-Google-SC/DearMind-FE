import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  Alert, Dimensions,ScrollView, KeyboardAvoidingView
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';
import useAuthStore from '../../store/useAuthStore';

const auth = getAuth(firebaseApp);
const { width, height } = Dimensions.get('screen');
/**
 * @param {{ navigate: (screen: 'SignUp' | 'Splash') => void }} props
 */
const LoginScreen = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', idToken);
      await api.post('/auth/login', { idToken });
      login();
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigate('SignUp')}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View> 
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: height * 0.05,
  },
  container: {
    flex: 1,
    paddingTop: height * 0.10, 
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
    marginBottom: height * 0.0065,
  },
  subtitle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: 'rgba(51, 51, 51, 0.7)',
    textAlign: 'center',
    marginBottom: height * 0.0296,
    lineHeight: 19,
  },
  googleButton: {
    alignSelf: 'center',
    marginBottom: height * 0.035,
    marginTop: height * 0.035,
  },
  googleLogo: {
    width: width * 0.08, 
    height: width * 0.08,
    resizeMode: 'contain',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.0296,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#2E2E2E',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  inputLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#2E2E2E',
    marginBottom: 3,
  },
  input: {
    fontFamily: 'Pretendard-Regular',
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.04,
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
    borderColor: '#b9b6b4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    color: '#B9B6B4',
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
    fontFamily: 'Pretendard-Regular',
    color: '#FF5900',
    fontSize: 13,
    fontWeight: '500',
  },
  forgot: {
    color: '#2E2E2E',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  loginButton: {
    marginTop: height * 0.12,
    backgroundColor: '#FFF',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  loginText: {
    color: '#2E2E2E',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
  signupRow: {
    marginTop: height * 0.01,
    color: '#2E2E2E',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    color: '#ff5900',
    fontWeight: '600',
  },
});


export default LoginScreen;