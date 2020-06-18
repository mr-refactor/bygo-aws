import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

// Graph QL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil
import { itemsState } from "../atoms/itemsState";
import { listsState } from "../atoms/listsState";
import { currentListState } from "../atoms/currentListState";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import { Card } from "react-native-shadow-cards";
import BagItems from "./BagItems";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Helpers
import { replaceItemAtIndex } from "../services/helpers";

const MyBagPage = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [lists, setLists] = useRecoilState(listsState);
  const currentList = useRecoilValue(currentListState);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setLists((prev) =>
      prev.map((l) => {
        if (l.id === currentList.id) {
          return { ...l, items: { items } };
        }
        return l;
      })
    );
  }, [items]);

  function emptyBag() {
    items.forEach((item) => removeFromBag(item));
  }

  function isEmpty() {
    if (
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
        <Card style={styles.noItems}>
          <Text style={styles.noHeader}>Looks Like Your Bag Is Empty</Text>
          <Text style={{ fontSize: 15, marginHorizontal: 25 }}>
            Tap the 'List' tab above and swipe right on an item to add it to
            your bag.
          </Text>
          <MaterialCommunityIcons
            style={{ marginVertical: 50 }}
            name="bag-personal-outline"
            size={150}
            color="rgba(0, 0, 0, 0.8)"
          />
        </Card>
      ) : (
        <>
          <BagItems />
          <Card style={styles.empty}>
            <TouchableOpacity onPress={emptyBag} style={styles.emptyTouch}>
              <MaterialCommunityIcons
                style={styles.emptyBagIcon}
                name="bag-personal-off-outline"
                size={24}
                color="#d4513f"
              />
              <Text style={{color: "#d4513f", fontSize: 20, marginLeft: 5}}>
                Empty
              </Text>
            </TouchableOpacity>
          </Card>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noItems: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
  },
  noHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 100,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 20,
  },
  empty: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "10%",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  emptyTouch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MyBagPage;
