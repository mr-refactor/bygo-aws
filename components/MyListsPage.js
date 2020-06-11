import React, { useEffect } from "react";
import { Text, Button, StyleSheet, View } from "react-native";

// Graph QL
import { API, graphqlOperation } from "aws-amplify";

// import { createUser } from "../src/graphql/mutations";
import { listLists } from "../src/graphql/queries";


// RECOIL
import { listsState } from "../atoms/listsState";
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState, useRecoilValue } from "recoil";

const MyListsPage = ({ navigation }) => {
  const currentUser = useRecoilValue(currentUserState);
  const [lists, setLists] = useRecoilState(listsState);

  useEffect(
  async () => {
    try {
      const userID = currentUser.id;
      const listsData = await API.graphql(
        graphqlOperation(listLists, { filter: {userID: {eq: userID}} })
      );
      const ld = listsData.data.listLists.items
      setLists(ld)
    } catch (err) {
      console.log("error finding user:", err);
    }
  }, []
  )

  return (
    <View style={styles.container}>
      <Button title="Add List" onPress={() => console.log("adding list")} />
      {/* <MyLists lists={lists} navigation={navigation} handleDel={() => console.log('deleting list')}></MyLists> */}
      {lists.map((l) => (
        <Text>{l.title}</Text>
      ))}
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

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default MyListsPage;
