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
import { createItem } from "../src/graphql/mutations";

// Recoil
import { currentListState } from "../atoms/currentListState";
import { itemsState } from '../atoms/itemsState';
import { useRecoilState, useRecoilValue } from "recoil";

// EXPO
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// helpers
import {categories} from '../services/categoryDictionary'

const AddItemModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("other");

  const [items, setItems] = useRecoilState(itemsState)
  const currentList = useRecoilValue(currentListState);

  async function addItem() {
    const itemToAdd = { name, category, checked: false, listID: currentList.id}
    try {
      console.log(itemToAdd)
      const data = await API.graphql(
        graphqlOperation(createItem, {
          input: itemToAdd,
        })
      );
      const newItem = {
        id: data.data.createItem.id,
        category: data.data.createItem.category,
        checked: data.data.createItem.checked,
        name: data.data.createItem.name,
        listID: data.data.createItem.list.id,
      };
      setItems((prev) => [...prev, newItem]);
      setName("");
      closeModal()
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  function searchCategories(val) {
    if (Object.keys(categories).includes(val.toLowerCase())){
      setCategory(categories[val.toLowerCase()])
    }
  }

  return (
    <BlurView intensity={80} style={styles.modalContainer}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.cancel} onPress={closeModal}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>New Item</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => {setName(val); searchCategories(val)}}
          defaultValue={name}
          placeholder="Enter your item name"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addItem()
          }}
        >
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add Item</Text>
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

export default AddItemModal;