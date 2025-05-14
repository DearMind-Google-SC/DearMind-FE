import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const DrawingCanvas = forwardRef(({ color, strokeWidth, paths, setPaths }, ref) => {
  const [currentPoints, setCurrentPoints] = useState('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        const y = evt.nativeEvent.locationY;
        setCurrentPoints(`M${x},${y}`);
      },
      onPanResponderMove: (evt) => {
        const x = evt.nativeEvent.locationX;
        const y = evt.nativeEvent.locationY;
        setCurrentPoints((prev) => `${prev} L${x},${y}`);
      },
      onPanResponderRelease: () => {
        if (currentPoints) {
          setPaths((prev) => [...prev, { d: currentPoints, color, strokeWidth }]);
          setCurrentPoints('');
        }
      },
    })
  ).current;

  useImperativeHandle(ref, () => ({
    getSvgRef: () => svgRef.current,
  }));

  const svgRef = useRef();

  return (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      <Svg
        ref={svgRef}
        height="100%"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {currentPoints !== '' && (
          <Path
            d={currentPoints}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default DrawingCanvas;
