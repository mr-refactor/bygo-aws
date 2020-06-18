import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";

// EXPO
import { BlurView } from "expo-blur";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const HamburgerToggleMenu = ({logOut}) => {
  const buttonSize = new Animated.Value(1);
  const mode = new Animated.Value(0);
  function handlePress() {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.9,
        duration: 200,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
      }),
    ]).start();
  }

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const sizeStyle = {
    transform: [{ scale: buttonSize }],
  };

  const profileX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -30],
  });
  const profileY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90],
  });
  const infoX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -30],
  });
  const infoY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 170],
  });
  const logOutX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -30],
  });
  const logOutY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          top: 0,
          left: -50,
        }}
      >
        <Animated.View
          style={{ position: "absolute", left: profileX, top: profileY }}
        >
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialIcons name="person-outline" size={30} color="black" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{ position: "absolute", left: infoX, top: infoY }}
        >
          <TouchableOpacity style={styles.secondaryButton}>
            <Feather name="help-circle" size={30} color="black" style={{marginTop: 2}} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{ position: "absolute", left: logOutX, top: logOutY }}
        >
          <TouchableOpacity style={styles.secondaryButton} onPress={logOut}>
            <Feather name="log-out" size={26} color="black" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.button]}>
          <TouchableOpacity onPress={handlePress}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <MaterialIcons name="menu" size={34} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 70,
    left: 0,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 80,
    width: 85,
    borderRadius: 0,
    backgroundColor: "#f5562a",
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#f5562a",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.5
  },
});

export default HamburgerToggleMenu;
