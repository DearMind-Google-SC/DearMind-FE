import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DrawingControls = ({ paths, setPaths, onSave }) => {
  const [redoStack, setRedoStack] = useState([]);

  const handleUndo = () => {
    if (paths.length === 0) return;
    const newPaths = [...paths];
    const popped = newPaths.pop();
    setPaths(newPaths);
    setRedoStack((prev) => [...prev, popped]);
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
      <TouchableOpacity onPress={handleUndo} style={styles.iconButton}>
        <Icon name="undo" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedo} style={styles.iconButton}>
        <Icon name="redo" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save a mood diary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#111',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DrawingControls;
