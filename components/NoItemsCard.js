import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-shadow-cards";
import themes from "../services/themes"



const NoItemsCard = () => {
  return (
    <Card style={styles.noItems}>
      <Text style={styles.noHeader}>You Haven't Added Any Items</Text>
      <Text style={{ fontSize: 15, fontFamily: `${themes.itemFont}`, marginHorizontal: 25 }}>
        Tap the ' + ' button to add a new item.
      </Text>
      <MaterialCommunityIcons
        style={{ marginVertical: 40 }}
        name="clipboard-text-outline"
        size={150}
        color="rgba(0, 0, 0, 0.8)"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  noItems: {
    flex: 9,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
  },
  noHeader: {
    fontSize: 22,
    fontFamily: `${themes.addFont}`,
    fontWeight: "600",
    marginTop: 100,
    marginBottom: 40,
  },
});

export default NoItemsCard;
