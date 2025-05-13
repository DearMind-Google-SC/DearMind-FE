// components/ColorToolbox.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const COLOR_OPTIONS = ['#000000', '#FF3B30', '#34C759', '#007AFF', '#FFD60A'];
const STROKE_WIDTHS = [2, 4, 6];

const ColorToolbox = ({ color, setColor, strokeWidth, setStrokeWidth }) => {
  return (
    <View style={styles.container}>
      {/* 색상 선택 */}
      <View style={styles.section}>
        {COLOR_OPTIONS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCircle,
              { backgroundColor: c },
              color === c && styles.selectedColor,
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {/* 펜 굵기 선택 */}
      <View style={styles.section}>
        {STROKE_WIDTHS.map((w) => (
          <TouchableOpacity
            key={w}
            style={[
              styles.strokeCircle,
              strokeWidth === w && styles.selectedStroke,
            ]}
            onPress={() => setStrokeWidth(w)}
          >
            <View style={{ width: w, height: w, backgroundColor: '#000', borderRadius: w / 2 }} />
          </TouchableOpacity>
        ))}
      </View>

      {/* 지우개 버튼 (흰색 펜으로 대체) */}
      <TouchableOpacity
        style={styles.eraserButton}
        onPress={() => setColor('#FFFFFF')}
      >
        <MaterialIcons name="remove-circle-outline" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 2,
  },
  strokeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStroke: {
    borderColor: '#000',
    borderWidth: 2,
  },
  eraserButton: {
    padding: 6,
    marginLeft: 10,
  },
});

export default ColorToolbox;
