import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseApp } from '../../firebaseConfig';
import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Image,
  Dimensions, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';

const { width, height } = Dimensions.get('window');
const auth = getAuth(firebaseApp);

/**
 * @param {{ navigate: (screen: 'Login' | 'Splash') => void }} props
 */
const SignUpScreen = ({ navigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = async () => {
    if (!agreeTerms) {
      Alert.alert('동의 필요', '이용 약관에 동의해주세요.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      const idToken = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', idToken);
      await api.post('/auth/signup', { idToken });
      Alert.alert('회원가입 성공', '서버 등록 완료!');
    } catch (error) {
      console.error(error);
      Alert.alert('에러', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.header}>Create an Account</Text>
          <Text style={styles.subheader}>Sign up now to get started with an account.</Text>

          <TouchableOpacity style={styles.googleButton}>
            <Image source={require('../../assets/images/google-logo.png')} style={styles.googleLogo} />
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput value={fullName} onChangeText={setFullName} style={styles.input} />
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

          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>
                I agree to the <Text style={styles.link}>Terms of Service</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.login}>Log In</Text>
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
    paddingTop: height * 0.1,
    paddingHorizontal: 24,
    backgroundColor: '#F4F0ED',
  },
  header: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
    color: '#2E2E2E',
    textAlign: 'center',
    marginBottom: height * 0.0065,
  },
  subheader: {
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
  checkboxRow: {
    flexDirection: 'row',
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
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#b9b6b4',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#B9B6B4',
  },
  checkboxChecked: {
    backgroundColor: '#FF5900',
  },
  checkmark: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  rememberText: {
    fontFamily: 'Pretendard-Regular',
    color: '#2E2E2E',
    fontSize: 13,
  },
  link: {
    fontFamily: 'Pretendard-Regular',
    color: '#FF5900',
    fontSize: 13,
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#2E2E2E',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.08,
  },
  signupText: {
    fontFamily: 'Pretendard-Regular',
    color: '#FFF',
    fontSize: 17.7,
    fontWeight: 'bold',
  },
  loginRow: {
    marginTop: height * 0.01,
    color: '#2E2E2E',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  login: {
    fontWeight: '600',
    color: '#ff5900',
  },
});


export default SignUpScreen;
