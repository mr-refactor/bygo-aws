import React from "react";
import { TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { deleteList } from "../src/graphql/mutations";

// RECOIL
import { listsState } from "../atoms/listsState";
import { useRecoilState } from "recoil";

// Helpers
import {removeItemAtIndex} from '../services/helpers'

const MyLists = ({ navigation }) => {
  const [lists, setLists] = useRecoilState(listsState);

  async function delList(id) {
    try {
      await API.graphql(graphqlOperation(deleteList, { input: { id } }));
      let index = lists.findIndex(l => l.id === id)
      setLists(prev => removeItemAtIndex(prev, index))
    } catch (err) {
      console.log("error deleting list:", err);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.li}
        onPress={() =>
          navigation.navigate("List", {
            list: item,
          })
        }
      >
        <TouchableOpacity onPress={() => delList(item.id)}>
          <Text style={styles.delButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
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
  container: {},
  li: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 20,
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
  text: {
    margin: 5,
  },
  delButton: {
    margin: 5,
  },
});

export default MyLists;
