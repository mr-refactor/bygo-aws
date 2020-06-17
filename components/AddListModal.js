import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { createList } from "../src/graphql/mutations";

// Recoil
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

// EXPO
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// helpers
import pickColor from "../services/colorRandomizer";


const AddListModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const currentUser = useRecoilValue(currentUserState);
  const [lists, setLists] = useRecoilState(listsState);

  async function addList() {
    try {
      const data = await API.graphql(
        graphqlOperation(createList, {
          input: { title, userID: currentUser.id },
        })
      );
      const newList = {
        id: data.data.createList.id,
        title: data.data.createList.title,
        userID: data.data.createList.user.id,
        items: {
          items: []
        },
        color: pickColor()
      };
      console.log(newList)
      setLists((prev) => [...prev, newList]);
      setTitle("");
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  return (
    <BlurView intensity={70} style={styles.modalContainer}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.cancel} onPress={closeModal}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>New List</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setTitle(val)}
          defaultValue={title}
          placeholder="Enter your list title"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addList();
            closeModal();
          }}
        >
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add List</Text>
        </TouchableOpacity>
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
    position: "relative",
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
    borderRadius: 10,
  },
  cancel: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  addButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#25db37",
    width: "60%",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default AddListModal;
