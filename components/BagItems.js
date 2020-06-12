import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

const BagItems = () => {
    const [ items, setItems ] = useRecoilState(itemsState)

    const itemsInBag = items.filter(item => item.checked)

    function renderItem({ item }) {
        return (
          <TouchableOpacity style={styles.li}>
            <TouchableOpacity>
              <Text style={styles.delButton} onPress={() => delItem(item.id)}>
                X
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity>
              <Text
                style={styles.checkButton}
                onPress={() => console.log("putting Item in bag")}
              >
                &#10003;
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }

    return (
        <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={itemsInBag}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listContainer: {
      flex: 5,
    },
    li: {
      flex: 1,
      flexDirection: "row",
      width: 300,
      borderWidth: 2,
      borderColor: "blue",
      padding: 5,
      margin: 5,
    },
    text: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: 5,
      fontSize: 17,
      // borderWidth: 2
    },
  });

export default BagItems
