import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet, View, TouchableOpacity } from "react-native";

// Graph QL
// import { API, graphqlOperation } from "aws-amplify";
// import { fetchLists } from "../src/custom/queries";

// RECOIL
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

// COMPONENTS
import MyLists from "./MyLists";
import AddListModal from "./AddListModal";
import ListIntro from "./ListIntro";

// Helpers
import pickColor from "../services/colorRandomizer";

/*-------------------------------------------------------------------------*/

const MyListsPage = ({ navigation }) => {
  const currentUser = useRecoilValue(currentUserState);
  const [lists, setLists] = useRecoilState(listsState);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   async function getLists() {
  //     try {
  //       const listsData = await API.graphql(
  //         graphqlOperation(fetchLists, { filter: {userID: {eq: currentUser.id}} })
  //       );
  //       setLists(listsData.data.listLists.items.map(l => ({...l, color: pickColor()})))
  //     } catch (err) {
  //       console.log("error fetching lists:", err);
  //     }
  //   }
  //   getLists()
  //   return () => {
  //     console.log('unmounting')
  //   }
  // },
  //   []
  // );

  useEffect(() => {
    setLists(currentUser.lists.items.map(l => ({...l, color: pickColor()})))
  }, [])

  function toggleAddListModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      {lists.length <= 0 ? (
        <ListIntro />
      ) : (
        <>
          <SearchBar
            containerStyle={styles.searchBar}
            // cancelButtonProps={{disabled: true}}
            lightTheme={true}
            platform="ios"
            placeholder="Search"
            onChangeText={(val) => setSearch(val)}
            value={search}
          />
          <MyLists navigation={navigation} search={search}></MyLists>
        </>
      )}
          <TouchableOpacity style={styles.addList} onPress={toggleAddListModal}>
            <AntDesign name="plus" size={35} color="white" />
          </TouchableOpacity>
          {showModal ? <AddListModal closeModal={toggleAddListModal} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start",
    alignItems: "center",
    // Remove
    // borderWidth: 1,
    // borderColor: "blue"
  },
  searchBar: {
    display: "flex",
    alignSelf: "flex-start",
    width: "100%",
    height: 70,
  },
  addList: {
    position: "absolute",
    bottom: 15,
    right: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#25db37",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.5
  },
});

export default MyListsPage;
