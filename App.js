import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle sending messages
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Fake bot reply after a short delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "🤖 Bot: " + input,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  // Render each message
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" ? { color: "white" } : { color: "black" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.messages}
      />

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage} // Send when pressing Enter
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e4e6eb",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputBox: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});