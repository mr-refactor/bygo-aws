import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Recoil

import { itemsState } from "../atoms/itemsState";
import { useRecoilState } from "recoil";

// Components

import BagItems from "./BagItems"

const MyBagPage = () => {
    return (
        <View style={styles.container}>
            <BagItems />
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
