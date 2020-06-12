import React, {useState, useEffect } from "react";
import { Text, Button, StyleSheet, View } from "react-native";

// RECOIL
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

// COMPONENTS
import MyLists from './MyLists'
import AddListModal from './AddListModal'

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
      <Button title="Add List" onPress={toggleAddListModal} />
      <MyLists navigation={navigation} ></MyLists>
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
});


export default MyListsPage;
