// screens/diary/DrawingScreen.js

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import DrawingCanvas from '../../components/DrawingCanvas';
import ColorToolbox from '../../components/ColorToolbox';
import DrawingControls from '../../components/DrawingControls';
import api from '../../api/axios';

const { height } = Dimensions.get('window');

const DrawingScreen = ({ goTo }) => {
  const viewShotRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [inputText, setInputText] = useState('');

  const handleSave = async () => {
    if (!viewShotRef.current) return;

    try {
      const uri = await viewShotRef.current.capture();
      const base64 = await fetch(uri).then(res => res.blob())
        .then(blob => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        }));

      const imageData = `data:image/png;base64,${base64}`;

      const res = await api.post('/diary', {
        image: imageData,
        text: inputText,
      });

      if (res.status === 201) {
        goTo('LoadingScreen', { imageData, text: inputText });
      } else {
        console.warn('일기 저장 실패:', res.status);
      }
    } catch (err) {
      console.error('저장 중 오류:', err);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.date}>April 26, 2025</Text>
      <Text style={styles.guide}>Draw how today’s weather makes you feel.</Text>

      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 1.0, result: 'tmpfile' }}
        style={styles.canvasWrapper}
      >
        <DrawingCanvas
          paths={paths}
          setPaths={setPaths}
          color={color}
          strokeWidth={strokeWidth}
        />
      </ViewShot>

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
        placeholderTextColor="#999"
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
    backgroundColor: '#fff',
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
    color: '#000',
  },
});

export default DrawingScreen;