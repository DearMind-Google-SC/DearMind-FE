// components/DrawingCanvas.js

import React, { forwardRef, useRef } from 'react';
import {
  Canvas,
  Path,
  Skia,
  useTouchHandler,
  useValue,
  useCanvasRef,
} from '@shopify/react-native-skia';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DrawingCanvas = forwardRef(({ color, strokeWidth, paths, setPaths }, ref) => {
  const canvasRef = useCanvasRef(); // Skia Canvas 객체 참조
  const currentPath = useRef(null);

  React.useImperativeHandle(ref, () => ({
  capture: () => {
    if (canvasRef.current) {
      return canvasRef.current.makeImageSnapshot();
    }
    return null;
  },
}));

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      currentPath.current = {
        path: newPath,
        color,
        strokeWidth,
      };
    },
    onActive: ({ x, y }) => {
      if (currentPath.current && currentPath.current.path) {
        currentPath.current.path.lineTo(x, y);
      }
    },
    onEnd: () => {
      if (currentPath.current) {
        setPaths((prev) => [...prev, currentPath.current]);
        currentPath.current = null;
      }
    },
  });

  return (
    <Canvas
      ref={canvasRef}
      style={styles.canvas}
      onTouch={touchHandler}
    >
      {paths.map((p, i) => (
        <Path
          key={i}
          path={p.path}
          color={p.color}
          style="stroke"
          strokeWidth={p.strokeWidth}
          strokeJoin="round"
          strokeCap="round"
        />
      ))}
    </Canvas>
  );
});

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});

export default DrawingCanvas;
