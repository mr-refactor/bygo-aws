import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../src/graphql/queries";
import { updateItem } from "../src/graphql/mutations";

// Recoil

import { currentListState } from "../atoms/currentListState";
import { itemsState } from "../atoms/itemsState";
import { useRecoilState, useRecoilValue } from "recoil";

// Components
import ListItems from "./ListItems";
import AddItemModal from "./AddItemModal";
// import MyBagIcon from "./MyBagIcon";
import MyBagPage from "./MyBagPage";
import Congrats from "./Congrats";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';


// HELPERS
// import {replaceItemAtIndex} from '../services/helpers'

/*-------------------------------------------------------------------------*/

const ViewList = ({ route, navigation }) => {
  const { list } = route.params;
  const [currentList, setCurrentList] = useRecoilState(currentListState);
  const [items, setItems] = useRecoilState(itemsState);
  const [showAddItem, setshowAddItem] = useState(false);
  const [showMyBag, setShowMyBag] = useState(false);
  const [empty, setEmpty] = useState(false);

  function isEmpty() {
    if (
      items.length > 0 &&
      items.length === items.filter((i) => i.checked).length
    ) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }

  function toggleAddItemModal() {
    setshowAddItem((prev) => !prev);
  }

  useEffect(isEmpty, [items]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const listData = await API.graphql(
          graphqlOperation(getList, { id: list.id })
        );
        const updatedList = listData.data.getList;
        setCurrentList(updatedList);
        setItems(updatedList.items.items);
      } catch (err) {
        console.log("error creating user:", err);
      }
    }
    fetchLists();
    return () => {
      setItems([]);
      setshowAddItem(false);
      setEmpty(false);
    };
  }, []);

  function toggleShowMyBag() {
    setShowMyBag((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={showMyBag ? styles.tab : [styles.tab, styles.highlighted]} onPress={toggleShowMyBag}>
          <MaterialCommunityIcons style={{marginBottom: 2, marginRight: 5,}} name="clipboard-text-outline" size={18} color="white" />
          <Text style={styles.tabText}>
            List ({items.filter((i) => !i.checked).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={!showMyBag ? styles.tab : [styles.tab, styles.highlighted]} onPress={toggleShowMyBag}>
          <MaterialCommunityIcons style={{marginBottom: 2, marginRight: 5,}} name="bag-personal-outline" size={18} color="#fff" />
          <Text style={styles.tabText}>Bag ({items.filter((i) => i.checked).length})
          </Text>
        </TouchableOpacity>
      </View>

      {showMyBag ? (
        <MyBagPage />
      ) : (
        <>
          <ListItems />
          <TouchableOpacity style={styles.addList} onPress={toggleAddItemModal}>
            <AntDesign name="plus" size={35} color="white" />
          </TouchableOpacity>
          {empty ? <Congrats navigation={navigation} /> : null}
          {showAddItem ? (
            <AddItemModal closeModal={toggleAddItemModal} />
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tabsContainer: {
    backgroundColor: "#f5562a",
    // borderTopColor: "#fff",
    // borderTopWidth: 2,
    display: "flex",
    flexDirection: "row",
    height: "5%",
    width: "100%",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  tabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: 16,
    marginBottom: 2
  },
  highlighted: {
    borderTopWidth: 2,
    borderTopColor: "#fff"
  },
  addList: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#25db37",
  },
});

export default ViewList;
