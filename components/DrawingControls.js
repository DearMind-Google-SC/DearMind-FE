// components/DrawingControls.js

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DrawingControls = ({ paths, setPaths, onSave }) => {
  const [redoStack, setRedoStack] = useState([]);

  const handleUndo = () => {
    if (paths.length === 0) return;
    const newPaths = [...paths];
    const last = newPaths.pop();
    setPaths(newPaths);
    setRedoStack((prev) => [...prev, last]);
  };
  

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedo = [...redoStack];
    const restored = newRedo.pop();
    setPaths((prev) => [...prev, restored]);
    setRedoStack(newRedo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUndo} style={styles.button}>
        <MaterialIcons name="undo" size={24} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedo} style={styles.button}>
        <MaterialIcons name="redo" size={24} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DrawingControls;
