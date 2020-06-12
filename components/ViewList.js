import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../src/graphql/queries";

// Recoil

import { currentListState } from "../atoms/currentListState";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import ListItems from "./ListItems";

// HELPERS
// import {replaceItemAtIndex} from '../services/helpers'

/*-------------------------------------------------------------------------*/

const ViewList = ({ route }) => {
  const { list } = route.params;
  const [currentList, setCurrentList] = useRecoilState(currentListState)
  const [items, setItems] = useRecoilState(itemsState)

  useEffect(async () => {
    try {
      console.log(list.id)
      const listData = await API.graphql(
        graphqlOperation(getList, { id: list.id })
      );
      const updatedList = listData.data.getList
      setCurrentList(updatedList)
      setItems(updatedList.items.items)
    } catch (err) {
      console.log("error creating user:", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ListItems />
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
});

export default ViewList;
