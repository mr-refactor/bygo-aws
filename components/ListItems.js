import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  View,
} from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { deleteItem } from "../src/graphql/mutations";

// Recoil

import { currentListState } from "../atoms/currentListState";
import { itemsState } from "../atoms/itemsState";
import { useRecoilState, useRecoilValue } from "recoil";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";

// Helpers
import { removeItemAtIndex } from "../services/helpers";
/*-------------------------------------------------------------------------*/

const ListItems = () => {
  const currentList = useRecoilValue(currentListState);
  const [items, setItems] = useRecoilState(itemsState);

  async function delItem(id) {
    try {
      await API.graphql(graphqlOperation(deleteItem, { input: { id } }));
      const index = items.findIndex((i) => i.id === id);
      setItems((prev) => removeItemAtIndex(prev, index));
    } catch (err) {
      console.log("error deleting list:", err);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.li}>
        <TouchableOpacity>
          <Text style={styles.delButton} onPress={() => delItem(item.id)}>
            X
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
        <TouchableOpacity>
          <Text
            style={styles.checkButton}
            onPress={() => console.log("putting Item in bag")}
          >
            &#10003;
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.addList}>
        <AntDesign name="plus" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  listContainer: {
    flex: 5,
  },
  li: {
    flex: 1,
    flexDirection: "row",
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
    fontSize: 17,
    // borderWidth: 2
  },
  delButton: {
    flex: 1,
    margin: 5,
    fontSize: 15,
    color: "red",
    // borderWidth: 2
  },
  checkButton: {
    flex: 1,
    margin: 5,
    fontSize: 15,
    color: "green",
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

export default ListItems;
