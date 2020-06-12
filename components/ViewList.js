import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../src/graphql/queries";

// Recoil

import { currentListState } from "../atoms/currentListState";
import { itemsState } from "../atoms/itemsState";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import ListItems from "./ListItems";
import AddItemModal from "./AddItemModal";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";

// HELPERS
// import {replaceItemAtIndex} from '../services/helpers'

/*-------------------------------------------------------------------------*/

const ViewList = ({ route }) => {
  const { list } = route.params;
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const [items, setItems] = useRecoilState(itemsState);
  const [showModal, setShowModal] = useState(false)

  function toggleAddItemModal() {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    async function fetchLists() {
      try {
        const listData = await API.graphql(
          graphqlOperation(getList, { id: list.id })
        );
        const updatedList = listData.data.getList;
        setCurrentList(updatedList);
        setItems(updatedList.items.items);
      } catch (err) {
        console.log("error creating user:", err);
      }
    }
    fetchLists();
  }, []);

  return (
    <View style={styles.container}>
      <ListItems />
      <TouchableOpacity style={styles.addList} onPress={toggleAddItemModal}>
        <AntDesign name="plus" size={35} color="white" />
      </TouchableOpacity>
      {showModal ? <AddItemModal closeModal={toggleAddItemModal}/> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addList: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "green"
  }
});

export default ViewList;
