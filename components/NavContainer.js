import React from "react";
import { TouchableOpacity, Text } from "react-native";


// Components
import MyListsPage from "./MyListsPage";
import Hamburger from "./HamburgerModal"
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
            height: 100,
            backgroundColor: "#f5562a",
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
              <Hamburger />
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
