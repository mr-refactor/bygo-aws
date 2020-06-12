import React, { useEffect } from "react";
import { Text, Button, StyleSheet, View } from "react-native";

// RECOIL
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

// COMPONENTS
import MyLists from './MyLists'

const MyListsPage = ({ navigation }) => {
  const currentUser = useRecoilValue(currentUserState);
  const [lists, setLists] = useRecoilState(listsState);

  useEffect(() => setLists(currentUser.lists.items), [])

  return (
    <View style={styles.container}>
      <Button title="Add List" onPress={() => console.log("adding list")} />
      <MyLists navigation={navigation} ></MyLists>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});


export default MyListsPage;
