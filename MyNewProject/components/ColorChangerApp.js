import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ColorChangerApp() {
  const [bg, setBg] = useState("#ffffff"); // default: white

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={styles.title}>Color Changer App</Text>

      <View style={styles.row}>
        <View style={styles.btn}>
          <Button title="White (Default)" onPress={() => setBg("#ffffff")} />
        </View>
        <View style={styles.btn}>
          <Button title="Light Blue" onPress={() => setBg("#ADD8E6")} />
        </View>
        <View style={styles.btn}>
          <Button title="Light Green" onPress={() => setBg("#90EE90")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  row: { flexDirection: "row", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  btn: { minWidth: 160, marginVertical: 6 }
});