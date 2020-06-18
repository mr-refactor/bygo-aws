import React from "react";
import { TouchableOpacity, Text } from "react-native";

// RECOIL
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState } from "recoil";

// Components
import MyListsPage from "./MyListsPage";
import Hamburger from "./HamburgerModal";
import MyBagPage from "./MyBagPage";
import ViewList from "./ViewList";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/*-------------------------------------------------------------------------*/

const Stack = createStackNavigator();

const NavContainer = ({handleLogOut}) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  function logOut() {
    setCurrentUser(null)
    handleLogOut()
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <Hamburger logOut={logOut}/>,
          headerStyle: {
            height: 100,
            backgroundColor: "#f5562a",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="My Lists" component={MyListsPage} />
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
