import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil
import { currentListState } from "../atoms/currentListState";
import { itemsState } from "../atoms/itemsState";
import { listsState } from "../atoms/listsState";
import { useRecoilState, useRecoilValue } from "recoil";

// EXPO
import { BlurView } from "expo-blur";

// Helpers
import { replaceItemAtIndex } from "../services/helpers";
import { currentUserState } from "../atoms/currentUserState";
import themes from "../services/themes"


const Congrats = ({ navigation }) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [lists, setLists] = useRecoilState(listsState);
  const currentList = useRecoilValue(currentListState);

  useEffect(() => {
    return () => {
      setLists((prev) =>
        prev.map((l) => {
          if (l.id === currentList.id) {
            return { ...l, items: { items: items.map(i => ({...i, checked: false})) } };
          }
          return l;
        })
      );
    };
  }, []);

  useEffect(() => {
    async function removeFromBag(item) {
      try {
        await API.graphql(
          graphqlOperation(updateItem, {
            input: { id: item.id, checked: false },
          })
        );
        // const index = items.findIndex((i) => i.id === item.id);
        // const baggedItem = { ...item, checked: false };
        // setItems((prev) => replaceItemAtIndex(prev, index, baggedItem));
      } catch (err) {
        console.log("error checking item:", err);
      }
    }
    items.forEach((i) => removeFromBag(i));
  }, []);

  return (
    <BlurView intensity={85} style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.header}>Congrats!</Text>
        <Text style={{ color: "white" }}>You're All Set</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("My Lists")}
        >
          <Text style={styles.buttonText}>Back to Lists</Text>
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
    fontFamily: `${themes.navFont}`,
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
    backgroundColor: "green",
    width: "60%",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: `${themes.addFont}`,
    marginLeft: 10,
  },
});

export default Congrats;
