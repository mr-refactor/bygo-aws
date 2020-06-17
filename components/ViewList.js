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
import ItemsIntro from './ItemsIntro'
import MyBagPage from "./MyBagPage";
import Congrats from "./Congrats";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-shadow-cards";

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
        <Card style={showMyBag ? styles.normalTab : styles.highlightedTab}>
          <TouchableOpacity style={styles.normalTab} onPress={toggleShowMyBag}>
            <MaterialCommunityIcons
              style={{ marginTop: 2, marginRight: 5 }}
              name="clipboard-text-outline"
              size={22}
              color={showMyBag ? "rgba(0, 0, 0, 0.7)" : "#fff"}
            />
            <Text style={showMyBag ? styles.tabText : styles.highTabText}>
              List ({items.filter((i) => !i.checked).length})
            </Text>
          </TouchableOpacity>
        </Card>
        <Card style={showMyBag ? styles.highlightedTab : styles.normalTab}>
          <TouchableOpacity style={styles.normalTab} onPress={toggleShowMyBag}>
            <MaterialCommunityIcons
              style={{marginRight: 5 }}
              name="bag-personal-outline"
              size={24}
              color={showMyBag ? "#fff" : "rgba(0, 0, 0, 0.7)"}
            />
            <Text style={showMyBag ? styles.highTabText : styles.tabText}>
              Bag ({items.filter((i) => i.checked).length})
            </Text>
          </TouchableOpacity>
        </Card>
      </View>

      {showMyBag ? (
        <MyBagPage />
      ) : (
        items.length <= 0 ? <ItemsIntro /> :
        <>
          <ListItems />
          <TouchableOpacity style={styles.addList} onPress={toggleAddItemModal}>
            <AntDesign name="plus" size={35} color="#fff" />
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
    // borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
  },
  highlightedTab: {
    flex: 1,

    flexDirection: "row",
    //   justifyContent: "center",
    //   alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    paddingVertical: 5,
    width: "25%",
    backgroundColor: "#f5562a",
  },
  normalTab: {
    flex: 1,

    flexDirection: "row",
    //   justifyContent: "center",
    //   alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    paddingVertical: 5,
    width: "25%",
    //   height: "100%",
  },
  highTabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: 20,
  },
  tabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 20,
    // marginBottom: 2,
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
