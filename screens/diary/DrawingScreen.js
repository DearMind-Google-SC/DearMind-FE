import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageFormat } from '@shopify/react-native-skia';
import api from '../../api/axios';
import DrawingCanvas from '../../components/DrawingCanvas';
import ColorToolbox from '../../components/ColorToolbox';
import DrawingControls from '../../components/DrawingControls';

const { width, height } = Dimensions.get('window');

const DrawingScreen = () => {
  const navigation = useNavigation();
  const canvasRef = useRef(); // Skia 캔버스를 참조하기 위함

  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [inputText, setInputText] = useState('');

  const handleSave = async () => {
    if (!canvasRef.current) return;
    const image = canvasRef.current.capture();
    if (!image) return;

    const base64 = image.encodeToBase64(ImageFormat.PNG);
    const imageData = `data:image/png;base64,${base64}`;

    try {
        const response = await api.post('/diary', {
        image: imageData,
        text: inputText,
        });

        if (response.status === 201) {
        navigation.navigate('LoadingScreen', {
            imageData,
            text: inputText,
        });
        } else {
        console.warn('Diary 저장 실패:', response.status);
        }
    } catch (err) {
        console.error('Diary 저장 중 오류 발생:', err);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.date}>April 26, 2025</Text>
      <Text style={styles.guide}>Draw how today’s weather makes you feel.</Text>

      <View style={styles.canvasWrapper}>
        <DrawingCanvas
          ref={canvasRef}
          color={color}
          strokeWidth={strokeWidth}
          paths={paths}
          setPaths={setPaths}
        />
      </View>

      <ColorToolbox
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
      />

      <TextInput
        style={styles.input}
        placeholder="How was your day?"
        value={inputText}
        onChangeText={setInputText}
        multiline
      />

      <DrawingControls
        paths={paths}
        setPaths={setPaths}
        onSave={handleSave}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  guide: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  canvasWrapper: {
    width: '100%',
    height: height * 0.35,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
});

export default DrawingScreen;
