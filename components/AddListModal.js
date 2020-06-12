import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BlurView } from 'expo-blur';

const AddListModal = () => {
  return (
    <BlurView intensity={70} style={styles.modalContainer}>
        <View style={styles.modal}>
            <Text style={styles.header}>New List</Text>
            <TextInput 
            style={styles.input}
            placeholder="Enter your list title"
            />
        </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    height: "40%",
    width: "80%",
    marginBottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
  },
  header: {
      textAlign: "center",
      color: "white",
      fontSize: 20,
      margin: 10,
  },
  input: {
      backgroundColor: "white",
      width: "80%",
      padding: 20,
      fontSize: 20,
  }
});

export default AddListModal;
