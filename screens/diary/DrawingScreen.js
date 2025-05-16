import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../../api/axios';
import leftarray from '../../assets/icons/leftarray.png';

const { height } = Dimensions.get('window');

const DrawingScreen = ({ goTo, exitDiary }) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [inputTextTitle, setInputTextTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [randomQuestion, setRandomQuestion] = useState('');

  const goBack = () => {
    exitDiary();
  };

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      try {
        const res = await api.get('/diary/randomtopic');
        setRandomQuestion(res.data?.question || 'Describe today’s weather.');
      } catch (e) {
        setRandomQuestion('Describe today’s weather.'); // fallback
      }
    };

    fetchRandomQuestion();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const sdkVersion = parseInt(Platform.Version.toString(), 10);

      let permission;
      if (sdkVersion >= 33) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const granted = await PermissionsAndroid.request(permission, {
        title: '사진 접근 권한 요청',
        message: 'SD 카드 또는 갤러리에서 이미지를 불러오기 위해 권한이 필요합니다.',
        buttonPositive: '허용',
        buttonNegative: '거부',
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          '권한 거부됨',
          '이미지 불러오기를 위해 권한이 필요합니다. 설정에서 수동으로 허용해주세요.',
        );
        return false;
      }
    } catch (error) {
      console.error('권한 요청 실패:', error);
      return false;
    }
  };

  // const handleFakePick = () => {
  //   const dummyBase64 =
  //     'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABpklEQVR42mJ8//8/AzSACZg';

  //   setImageBase64(dummyBase64);
  //   setImageUri('data:image/png;base64,' + dummyBase64);
  // };


  const handleImagePick = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true }, // ✅ base64 직접 요청
      async (response) => {
        if (response.didCancel || response.errorCode) return;

        const asset = response.assets?.[0];
        if (!asset?.uri || !asset?.base64) return;

        try {
          // 1. 원본 base64
          const originalBase64 = asset.base64;

          // 2. 리사이징 (화질을 낮춘 이미지로 대체할 수도 있음)
          const resized = await ImageResizer.createResizedImage(
            asset.uri,
            800, // width
            800, // height
            'JPEG',
            70 // quality
          );

          // 💡 리사이징된 이미지의 base64는 launchImageLibrary로 못 받음
          // 하지만 원본 이미지가 충분히 작으면 이 단계 생략 가능

          // 3. 상태 저장 (리사이징 결과의 uri는 보여줄 용도, base64는 원본 그대로 사용)
          setImageUri(resized.uri);          // 리사이징된 이미지 썸네일
          setImageBase64(originalBase64);    // base64는 원본에서 받은 값 그대로 사용
        } catch (err) {
          console.error('이미지 처리 실패:', err);
        }
      }
    );
  };
  const handleSubmit = () => {
    if (!imageBase64) return;

    goTo('Loading', {
      imageData: `data:image/jpeg;base64,${imageBase64}`,
      text: inputText,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Image source={leftarray} style={styles.leftIcon} />
          </TouchableOpacity>
          <Text style={styles.date}>April 26, 2025</Text>
          <Text style={styles.guide}>{randomQuestion}</Text>
        </View>

        <TouchableOpacity style={styles.canvasWrapper} onPress={handleImagePick}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.imagePlaceholder}>Tap to select image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.inputTextTitle}
          placeholder="Enter a title"
          value={inputTextTitle}
          onChangeText={setInputTextTitle}
          placeholderTextColor="#B9B6B4"
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="How was your day? Write down how you felt today."
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor="#B9B6B4"
          multiline
        />

        {/* <TouchableOpacity style={styles.saveButton} onPress={handleFakePick}>
          <Text style={styles.saveButtonText}>Use Dummy Image</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save a mood diary</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20, // ✅ 버튼이 잘리지 않도록 충분한 하단 여백 확보
    backgroundColor: '#F9F5F3',
  },
  header: {
    flex: 1,
    backgroundColor: '#F9F5F3',
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginBottom: 20,
    marginLeft: 10,
    color: '#2E2E2E',
  },
  date: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 24,
    textAlign: 'center',
  },
  guide: {
    fontSize: 20,
    color: '#FF5900',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 24,
  },
  canvasWrapper: {
    width: '95%',
    height: height * 0.5,
    borderWidth: 1,
    borderColor: '#b9b6b4',
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imagePlaceholder: {
    color: '#aaa',
    fontSize: 18,
    color: '#b9b6b4',
    fontWeight: '600',
    textAlign: 'center',
  },
  inputTextTitle:{
    paddingHorizontal: 14,
    fontSize: 20,
    marginBottom: 4,
    fontWeight: '600',
    color: '#2e2e2e',
    fontFamily: 'Pretendard-Regular',
  },
  input:{
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 17,
    fontFamily: 'Pretendard-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 24,
    color: '#2e2e2e',
    fontWeight: '400',
  },
  saveButton: {
    backgroundColor: '#2E2E2E',
    paddingVertical: height * 0.025,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: height * 0.0197,
    width: '100%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17.7,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
  },
});

export default DrawingScreen;
