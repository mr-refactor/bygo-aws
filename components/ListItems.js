import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  View,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Card } from "react-native-shadow-cards";
import { AntDesign } from "@expo/vector-icons";

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
  const uncheckedItems = items.filter((i) => !i.checked);

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
          input: { id: item.id, checked: true },
        })
      );
      const index = items.findIndex((i) => i.id === item.id);
      const baggedItem = { ...item, checked: true };
      setItems((prev) => replaceItemAtIndex(prev, index, baggedItem));
    } catch (err) {
      console.log("error checking item:", err);
    }
  }
  // LIST ITEM RETURN
  function renderItem({ item }) {
    return (
      <Swipeable
        renderLeftActions={LeftActions}
        onSwipeableLeftOpen={() => addToBag(item)}
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            handlePress={delItem}
            id={item.id}
          />
        )}
      >
        <Card style={styles.li}>
          <AntDesign name="questioncircleo" size={26} color="black" />
          <Text style={styles.text}>
            {item.name}
            </Text>
        </Card>
      </Swipeable>
    );
  }
  // MAIN RETURN
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

// LEFT ACTION COMPONENT

const styles = StyleSheet.create({
  listContainer: {
    margin: 10,
    flex: 1,
    width: "100%",
  },
  li: {
    flex: 1,
    flexDirection: "row",
    shadowColor: "#000",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    borderLeftWidth: 7,
    borderLeftColor: "blue",
  },
  text: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
  },
  leftAction: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 20,
  },
});

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={styles.leftAction}>
      <AntDesign name="checkcircleo" size={26} color="green" />
    </Animated.View>
  );
};

// RIGHT ACTION COMPONENT
const RightActions = ({ progress, dragX, handlePress, id }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity
      style={styles.rightAction}
      onPress={() => handlePress(id)}
    >
      <AntDesign name="delete" size={26} color="red" />
    </TouchableOpacity>
  );
};
export default ListItems;
