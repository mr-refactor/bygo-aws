import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'

// Graph QL
import { API, graphqlOperation } from "aws-amplify";
import { updateItem } from "../src/graphql/mutations";

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

// Components

import BagItems from "./BagItems"

// Helpers
import { replaceItemAtIndex } from "../services/helpers";

const MyBagPage = () => {
    const [ items, setItems ] = useRecoilState(itemsState)

    function emptyBag() {
      items.forEach(item => removeFromBag(item))
    }

    async function removeFromBag(item) {
      try {
        await API.graphql(
          graphqlOperation(updateItem, {
            input: {id: item.id, checked: false},
          })
        );
        const index = items.findIndex(i => i.id === item.id)
        const baggedItem = {...item, checked: false}
        setItems(prev => replaceItemAtIndex(prev, index, baggedItem))
      } catch (err) {
        console.log("error checking item:", err);
      }
    }
  
    return (
        <View style={styles.container}>
            <BagItems />
            <Button title="Empty Bag" onPress={emptyBag} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    noItems: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    button: {
      flex: 1,
      justifyContent: "flex-end",
      margin: 20,
    },
    empty: {
      color: "red",
    },
  });

export default MyBagPage
