import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
  Animated
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { deleteList } from "../src/graphql/mutations";

// RECOIL
import { listsState } from "../atoms/listsState";
import { useRecoilState } from "recoil";

// Helpers
import { removeItemAtIndex } from "../services/helpers";

const MyLists = ({ navigation }) => {
  const [lists, setLists] = useRecoilState(listsState);

  async function delList(id) {
    try {
      await API.graphql(graphqlOperation(deleteList, { input: { id } }));
      let index = lists.findIndex((l) => l.id === id);
      setLists((prev) => removeItemAtIndex(prev, index));
    } catch (err) {
      console.log("error deleting list:", err);
    }
  }

  function renderItem({ item }) {
    return (
      <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          handlePress={delList}
          id={item.id}
          />)}
      >
        <View style={styles.li}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("View List", {
                list: item,
              })
            }
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={lists}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  li: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    margin: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    margin: 5,
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

export default MyLists;
