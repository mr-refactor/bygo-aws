import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { deleteList } from "../src/graphql/mutations";

// RECOIL
import { listsState } from "../atoms/listsState";
import { useRecoilState } from "recoil";

// Helpers
import { removeItemAtIndex } from "../services/helpers";
import pickColor from "../services/colorRandomizer";

const MyLists = ({ navigation, search }) => {
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
    const {
      items: { items },
    } = item;
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            handlePress={delList}
            id={item.id}
          />
        )}
      >
        <View>
          <TouchableOpacity
            style={styles.li}
            onPress={() =>
              navigation.navigate("View List", {
                list: item,
              })
            }
          >
            <Text numberOfLines={1} style={styles.text}>
              {item.title}
            </Text>
            <View style={[styles.itemsCount, {backgroundColor: `${pickColor()}`}]}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                {items.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={search.length > 2 ? lists.filter(l => l.title.includes(search)) : lists }
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    //  borderWidth: 2,
    // borderColor: "blue"
  },
  li: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginLeft: 20,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.2)",

    paddingRight: 25,
    //   margin: 5,
  },
  text: {
    paddingVertical: 20,
    fontSize: 20,
  },
  itemsCount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 10,
  },
  rightAction: {
    marginRight: 20,
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
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
      <AntDesign name="delete" size={30} color="red" />
    </TouchableOpacity>
  );
};

export default MyLists;
