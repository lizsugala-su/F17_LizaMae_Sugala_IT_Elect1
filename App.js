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
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [messages, setMessages] = useState([]);

  // Messenger send
  const sendMessenger = () => {
    if (message.trim() === "") return;
    const newMessage = { id: Date.now().toString(), text: message, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Auto reply
    setTimeout(() => {
      const reply = { id: (Date.now() + 1).toString(), text: "🤖 Bot: Hi Rayla", sender: "bot" };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  // Add comment
  const addComment = () => {
    if (comment.trim() === "") return;
    const newComment = { id: Date.now().toString(), text: comment };
    setComments((prev) => [...prev, newComment]);
    setComment("");
  };

  return (
    <LinearGradient colors={["#6dd5ed", "#2193b0"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Messenger */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💬 Messenger</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === "bot" && { color: "#222" },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
            style={{ maxHeight: 180, marginBottom: 10 }}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessenger}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* News Feed */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📰 News Feed</Text>
          <View style={styles.newsHeader}>
            <Text style={styles.newsAuthor}>Breaking News</Text>
            <Text style={styles.newsTime}>2h ago</Text>
          </View>
          <Text style={styles.newsContent}>
  🚨 Category 4 typhoon *Amihan* rapidly intensifies and is expected to make landfall 
  in Northern Luzon tonight. Authorities urge residents in coastal areas to evacuate immediately.
</Text>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentBubble}>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            style={{ maxHeight: 120, marginBottom: 10 }}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={setComment}
              placeholder="Write a comment..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.commentBtn} onPress={addComment}>
              <Text style={styles.sendText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 14,
  },

  // Card design
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  // Titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
    textAlign: "center",
  },

  // Messenger bubbles
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: "75%",
  },
  userBubble: {
    backgroundColor: "#4a90e2",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 14,
    color: "#fff",
  },

  // Inputs
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendBtn: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
  commentBtn: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },

  // News
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  newsAuthor: {
    fontWeight: "600",
    color: "#e74c3c",
  },
  newsTime: {
    fontSize: 12,
    color: "#888",
  },
  newsContent: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
    lineHeight: 20,
  },

  // Comments
  commentBubble: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
  },
  commentText: {
    fontSize: 13,
    color: "#444",
  },
});