import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { itemsState } from '../atoms/itemsState'
import {useRecoilValue} from 'recoil'
import themes from "../services/themes"


const MyBagFooter = ({ navigation}) => {
  const items = useRecoilValue(itemsState)

  const itemsInBag = items.filter(item => item.checked)

  function viewMyBag(){
    navigation.navigate("My Bag")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={viewMyBag} >
        <MaterialCommunityIcons style={styles.icon} name="bag-personal"/>
        <Text style={styles.label}>
          My Bag ({itemsInBag.length})
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
    // borderWidth: 2,
    // borderColor: "blue",
  },
 
  label: {
    fontSize: 20,
    fontFamily: `${themes.addFont}`,
    padding: 10,
    marginBottom: 20
  },
  icon: {
    fontSize: 26,
    fontFamily: `${themes.itemFont}`,
    paddingBottom: 10,
    marginBottom: 20
  },
});

export default MyBagFooter;