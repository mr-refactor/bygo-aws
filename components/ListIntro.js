import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Card } from "react-native-shadow-cards";
import { AntDesign } from "@expo/vector-icons";

const ListIntro = () => {
  return (
    <>
      <Card style={styles.infoModal}>
          <Text style={styles.header}>Welcome to Bygo!</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>Lists</Text>
          <Text style={styles.content}>
            1. Click the ' + ' button below to add a new list
          </Text>
          <Text style={styles.content}>
            2. Once you've created a list you can tap it to view the contents
          </Text>
          <Text style={styles.content}>
            3. If you want to permanently delete a list, swipe left and tap '<AntDesign name="delete" size={15} color="black" />'
          </Text>
          <Text style={styles.contentHeader}>Items</Text>
          <Text style={styles.content}>
            1. Click the ' + ' button below to add a new item
          </Text>
          <Text style={styles.content}>
            2. You can swipe right on an item to add it to your bag or swipe left and tap '<AntDesign name="delete" size={15} color="black" />' to remove it from the list
          </Text>
          <Text style={styles.content}>
            3. From the bag page, you can swipe left on an item to put it back on the list or tap "Empty" to remove everything from the bag 
          </Text>
        </View>
      </Card>
       
    </>
  );
};

const styles = StyleSheet.create({
  infoModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    fontSize: 30,
    margin: 5,
  },
  contentContainer: {
    margin: 10,
  },
  contentHeader: {
    fontSize: 20,
    fontWeight: "600"
  },
  content: {
    fontSize: 20,
    margin: 5
  }
});

export default ListIntro;
