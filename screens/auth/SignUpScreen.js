import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, CheckBox } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';

const SignUpScreen = () => {
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
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName: fullName });
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Create an Account</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>Sign up now to get started with an account.</Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />

      {/* Email */}
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />

      {/* Terms Checkbox */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <CheckBox value={agreeTerms} onValueChange={setAgreeTerms} />
        <Text> I have read and agree to the <Text style={{ color: 'orange' }}>Terms of Service</Text></Text>
      </View>

      {/* Sign Up Button */}
      <Button title="Sign Up" onPress={handleSignup} />

      {/* Log in Link */}
      <TouchableOpacity onPress={() => Alert.alert('로그인 화면으로 이동')}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Already have an account? <Text style={{ color: 'orange' }}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;