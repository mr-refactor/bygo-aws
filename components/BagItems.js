import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Card } from "react-native-shadow-cards";


// Graph QL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

// EXPO ICONS
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


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
        onSwipeableRightOpen={() => removeFromBag(item)}
      >
        <Card style={styles.li}>
          <AntDesign name="questioncircleo" size={24} color="black" />
          <Text style={styles.text}>{item.name}</Text>
        </Card>
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
    justifyContent: "center",
    marginLeft: 20,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 20,
  },
});

// RIGHT ACTION COMPONENT
const RightActions = ({ progress, dragX }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity
      style={styles.rightAction}
    >
      <MaterialCommunityIcons name="bag-personal-off-outline" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BagItems;
