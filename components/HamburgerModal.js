import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// EXPO
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

const HamburgerToggleMenu = () => {
    return (
        <TouchableOpacity onPress={() => alert("Hamburger Menu YAY!") }>
        <MaterialIcons
          name="menu"
          size={34}
          color="#fff"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    )
}

export default HamburgerToggleMenu
