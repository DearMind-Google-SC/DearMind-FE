import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLOR_OPTIONS = ['#000000', '#F26B1F', '#FF3B30', '#34C759', '#6E5ADF'];
const STROKE_WIDTHS = [2, 4, 6];

const ColorToolbox = ({ color, setColor, strokeWidth, setStrokeWidth }) => {
  return (
    <View style={styles.container}>
      {/* 색상 선택 */}
      <View style={styles.colorSection}>
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
        {/* 지우개 */}
        <TouchableOpacity
          style={styles.eraser}
          onPress={() => setColor('#FFFFFF')} // 배경색으로 덮기
        >
          <Icon name="eraser" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 펜 굵기 선택 */}
      <View style={styles.strokeSection}>
        {STROKE_WIDTHS.map((w) => (
          <TouchableOpacity
            key={w}
            style={[
              styles.strokeCircle,
              strokeWidth === w && styles.selectedStroke,
            ]}
            onPress={() => setStrokeWidth(w)}
          >
            <View
              style={{
                width: w * 2,
                height: w * 2,
                borderRadius: w,
                backgroundColor: '#333',
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 2,
  },
  eraser: {
    marginLeft: 4,
    padding: 4,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  strokeSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default ColorToolbox;
