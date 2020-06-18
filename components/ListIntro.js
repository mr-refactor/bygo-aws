import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Card } from "react-native-shadow-cards";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";


const ListIntro = () => {
  return (
    <>
      <Card style={styles.infoModal}>
          <Text style={styles.header}>Welcome to Bygo!</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>Try Adding A List</Text>
          <Text style={styles.content}>
            1. Click the  +  button below to add a new list
          </Text>
          <Text style={styles.content}>
            2. Once you've created a list you can tap it to view the contents
          </Text>
          <Text style={styles.content}>
            3. If you want to permanently delete a list, swipe left and tap  <AntDesign name="delete" size={15} color="black" />
          </Text>
          <Text style={[styles.contentHeader, {marginVertical: 10}]}>Or</Text>
             
          <Text style={styles.content}>You can always tap  <MaterialIcons name="menu" size={15} />  for more options </Text>
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
    marginTop: 30,
    marginBottom: 85,
  },
  header: {
    fontSize: 30,
    marginVertical: 25,
    marginHorizontal: 5
  },
  contentContainer: {
    margin: 15,
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
