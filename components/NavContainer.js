import React from "react";

// Components
import MyListsPage from './MyListsPage'

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="My Lists" component={MyListsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
