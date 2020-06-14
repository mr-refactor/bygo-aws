import React, {useState, useEffect } from "react";
import { Text, Button, StyleSheet, View, TouchableOpacity } from "react-native";

// RECOIL
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

// Expo Icons
import { AntDesign } from "@expo/vector-icons";

// COMPONENTS
import MyLists from './MyLists'
import AddListModal from './AddListModal'

/*-------------------------------------------------------------------------*/

const MyListsPage = ({ navigation }) => {
  const currentUser = useRecoilValue(currentUserState);
  const [lists, setLists] = useRecoilState(listsState);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => setLists(currentUser.lists.items), [])

  function toggleAddListModal() {
    setShowModal(prev => !prev)
  }

  return (
    <View style={styles.container}>
      <MyLists navigation={navigation} ></MyLists>
      <TouchableOpacity style={styles.addList} onPress={toggleAddListModal}>
        <AntDesign name="plus" size={35} color="white" />
      </TouchableOpacity>
      {showModal ? <AddListModal closeModal={toggleAddListModal}/>: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
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
    backgroundColor: "#5cff6f",
  },
});


export default MyListsPage;
