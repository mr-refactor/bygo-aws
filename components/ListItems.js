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
import { updateItem } from "../src/graphql/mutations";

// Recoil

// import { currentListState } from "../atoms/currentListState";
import { itemsState } from "../atoms/itemsState";
import { useRecoilState, useRecoilValue } from "recoil";

// Helpers
import { removeItemAtIndex, replaceItemAtIndex } from "../services/helpers";
/*-------------------------------------------------------------------------*/

const ListItems = () => {
  // const currentList = useRecoilValue(currentListState);
  const [items, setItems] = useRecoilState(itemsState);
  const uncheckedItems = items.filter(i => !i.checked)

  async function delItem(id) {
    try {
      await API.graphql(graphqlOperation(deleteItem, { input: { id } }));
      const index = items.findIndex((i) => i.id === id);
      setItems((prev) => removeItemAtIndex(prev, index));
    } catch (err) {
      console.log("error deleting list:", err);
    }
  }

  async function addToBag(item) {
    try {
      await API.graphql(
        graphqlOperation(updateItem, {
          input: {id: item.id, checked: true},
        })
      );
      const index = items.findIndex(i => i.id === item.id)
      const baggedItem = {...item, checked: true}
      setItems(prev => replaceItemAtIndex(prev, index, baggedItem))
    } catch (err) {
      console.log("error checking item:", err);
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
            onPress={() => addToBag(item)}
          >
            &#10003;
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={uncheckedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default ListItems;
