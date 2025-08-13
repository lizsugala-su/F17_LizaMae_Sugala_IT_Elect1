import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ColorChangerApp() {
  const [bgColor, setBgColor] = useState('white');

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Button title="White" onPress={() => setBgColor('white')} />
      <View style={{ height: 10 }} />
      <Button title="Light Blue" onPress={() => setBgColor('lightblue')} />
      <View style={{ height: 10 }} />
      <Button title="Light Green" onPress={() => setBgColor('lightgreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, minHeight: 200 }
});