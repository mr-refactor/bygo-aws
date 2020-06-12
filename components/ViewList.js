import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Recoil

import { listsState } from "../atoms/listsState";
import { itemsState } from "../atoms/itemsState";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import ListItems from './ListItems'

const ViewList = ({ route }) => {
  const {list} = route.params
  const [lists, setLists] = useRecoilState(listsState);
  const [items, setItems] = useRecoilState(itemsState);

  useEffect(() => setItems(list.items.items), [])

  return (
    <View style={styles.container}>
        {console.log(items)}
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
