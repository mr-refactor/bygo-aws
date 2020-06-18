import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated, Text } from "react-native";

// EXPO
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

const HamburgerToggleMenu = () => {
 const buttonSize = new Animated.Value(1);
 const mode = new Animated.Value(0)
  function handlePress() {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.9,
        duration: 200,
      }),
      Animated.timing(buttonSize, {
        toValue: 1
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0
      })
    ]).start();
  }

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"]
  })

  const sizeStyle = {
    transform: [{scale: buttonSize}]
  }

  const profileX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, -25]
  })
  const profileY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 90]
  })
  const infoX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, -25]
  })
  const infoY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 150]
  })
  const logOutX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, -25]
  })
  const logOutY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 210]
  })

  return (
    <View style={{ position: "absolute", alignItems: "center", top: 0, left: -45}}>
      <Animated.View style={{position: "absolute", left: profileX, top: profileY}}>
        <View style={styles.secondaryButton}>
          <Text>Profile</Text>
        </View>
      </Animated.View>
      <Animated.View style={{position: "absolute", left: infoX, top: infoY}}>
        <View style={styles.secondaryButton}>
          <Text>Info</Text>
        </View>
      </Animated.View>
      <Animated.View style={{position: "absolute", left: logOutX, top: logOutY}}>
        <View style={styles.secondaryButton}>
          <Text>Info</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={{transform: [{rotate: rotation}]}}>
            <MaterialIcons
              name="menu"
              size={34}
              color="#fff"
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 70,
    width: 85,
    borderRadius: 0,
    backgroundColor: "#f5562a"
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#f5562a",
    backgroundColor: "#fff"
  }
});

export default HamburgerToggleMenu;
