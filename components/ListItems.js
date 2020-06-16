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
        <View style={styles.li}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
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
    alignItems: "center",
    shadowColor: "#000",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
  },
  // text: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   margin: 5,
  //   fontSize: 17,
  //   // borderWidth: 2
  // },
  // leftAction: {
  //   backgroundColor: "#388e3c",
  //   justifyContent: "center",
  //   flex: 1,
  // },
  // rightAction: {
  //   backgroundColor: "#dd2c00",
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  // },
  // actionText: {
  //   color: "#fff",
  //   fontWeight: "400",
  //   padding: 10,
  // },
});

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Bag
      </Animated.Text>
    </View>
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
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Delete
      </Animated.Text>
    </TouchableOpacity>
  );
};
export default ListItems;
