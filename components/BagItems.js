import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Graph QL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

// EXPO ICONS
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Helpers
import { replaceItemAtIndex } from "../services/helpers";

const BagItems = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const itemsInBag = items.filter((item) => item.checked);

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

  function renderItem({ item }) {
    return (
      <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          handlePress={removeFromBag}
          item={item}
        />
      )}
      >
        <View style={styles.li}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </Swipeable>
    );
  }

  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={itemsInBag}
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
    marginLeft: 20,
    fontSize: 17,
    // borderWidth: 2
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actionText: {
    color: "#fff",
    fontWeight: "400",
    padding: 10,
  },
});

// RIGHT ACTION COMPONENT
const RightActions = ({ progress, dragX, handlePress, item }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity
      style={styles.rightAction}
      onPress={() => handlePress(item)}
    >
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Remove from Bag
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default BagItems;
