import React, { useState } from "react";

// AMPLIFY
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

// GraphQL

// Authorization
// import { withAuthenticator } from 'aws-amplify-react-native'

// RECOIL

import { RecoilRoot } from "recoil";

// REACT NATIVE
// import { StyleSheet, Text, TextInput, Button, View } from "react-native";

// COMPONENTS

import LoginPage from "./components/LoginPage";
import NavigationContainer from "./components/NavContainer";

/*-------------------------------------------------------------------------*/

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  function toggleLoggedIn() {
    setLoggedIn((prev) => !prev);
  }

  return (
    <RecoilRoot>
      {loggedIn ? <NavigationContainer handleLogOut={toggleLoggedIn} /> : <LoginPage toggleLoggedIn={toggleLoggedIn} />}
      {/* <NavigationContainer handleLogOut={toggleLoggedIn}/> */}
    </RecoilRoot>
  );
};

export default App;
