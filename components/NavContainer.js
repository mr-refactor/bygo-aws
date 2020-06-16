import React from "react";
import { TouchableOpacity, Text } from "react-native";

// EXPO ICONS
import { MaterialIcons } from "@expo/vector-icons";

// Components
import MyListsPage from "./MyListsPage";
import MyBagPage from "./MyBagPage";
import ViewList from "./ViewList";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/*-------------------------------------------------------------------------*/

const Stack = createStackNavigator();

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f5562a",
            height: 90,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="My Lists"
          component={MyListsPage}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => alert("Hamburger Menu YAY!")}>
                <MaterialIcons
                  name="menu"
                  size={34}
                  color="#fff"
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="View List"
          component={ViewList}
          options={({ route }) => ({ title: route.params.list.title })}
        />
        {/* <Stack.Screen name="My Bag" component={MyBagPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
