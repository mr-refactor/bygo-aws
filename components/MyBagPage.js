import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

// Graph QL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

// Components

import BagItems from "./BagItems";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Helpers
import { replaceItemAtIndex } from "../services/helpers";

const MyBagPage = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [empty, setEmpty] = useState(false);

  function emptyBag() {
    items.forEach((item) => removeFromBag(item));
  }

  function isEmpty() {
    if (
      items.length > 0 &&
      items.length === items.filter((i) => !i.checked).length
    ) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }

  useEffect(isEmpty, [items]);

  async function removeFromBag(item) {
    try {
      await API.graphql(
        graphqlOperation(updateItem, {
          input: { id: item.id, checked: false },
        })
      );
      const index = items.findIndex((i) => i.id === item.id);
      const baggedItem = { ...item, checked: false };
      setItems((prev) => replaceItemAtIndex(prev, index, baggedItem));
    } catch (err) {
      console.log("error checking item:", err);
    }
  }

  return (
    <View style={styles.container}>
      {empty ? (
        <View style={styles.noItems}>
          <Text>Your Bag is Empty</Text>
        </View>
      ) : (
        <>
          <BagItems />
          <TouchableOpacity style={styles.empty} onPress={emptyBag}>
            <MaterialCommunityIcons
              style={styles.emptyBagIcon}
              name="bag-personal-outline"
              size={35}
              color="white"
            />
            <Text style={{ color: "#000", fontSize: 24, fontWeight: "500" }}>
              Empty
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 20,
  },
  empty: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#ff5d3d",
    marginVertical: 20,
  },
  emptyBagIcon: {
    position: "absolute",
    top: 7,
    left: 32,
  },
});

export default MyBagPage;
