import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Card } from "react-native-shadow-cards";
import { AntDesign } from "@expo/vector-icons";

const ItemsIntro = ({ handlePress }) => {
  return (
    <>
      <Card style={styles.infoModal}>
        <Text style={styles.header}>Welcome to Bygo!</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            1. Click the ' + ' button below to add a new list
          </Text>
          <Text style={styles.content}>
            2. Once you've created a list you can tap it to view the contents
          </Text>
          <Text style={styles.content}>
            3. If you want to permanently delete a list, swipe left and tap '
            <AntDesign name="delete" size={15} color="black" />'
          </Text>
        </View>
      </Card>
      <TouchableOpacity style={styles.addList} onPress={handlePress}>
        <AntDesign name="plus" size={35} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  infoModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
  },
  header: {
    fontSize: 30,
    margin: 20,
  },
  contentContainer: {
    margin: 10,
  },
  content: {
    fontSize: 20,
    margin: 5,
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

export default ItemsIntro;
