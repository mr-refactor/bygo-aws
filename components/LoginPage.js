import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../src/graphql/mutations";
import { fetchUsers } from "../src/custom/queries";

// RECOIL
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState } from "recoil";

const initialState = { email: "", password: "" };

const LoginPage = ({ toggleLoggedIn }) => {
  const [formState, setFormState] = useState(initialState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addUser() {
    try {
      const user = { ...formState };
      const cuData = await API.graphql(
        graphqlOperation(createUser, { input: user })
      );
      const cu = cuData.data.createUser;
      setCurrentUser(cu);
      toggleLoggedIn();
      setFormState(initialState);
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  async function signIn() {
    try {
      const user = { ...formState };
      const cuData = await API.graphql(
        graphqlOperation(fetchUsers, { filter: {email: {eq: user.email}} })
      );
      console.log(cuData)
      const cu = cuData.data.listUsers.items[0]
      setCurrentUser(cu);
      toggleLoggedIn()
      setFormState(initialState)
    } catch (err) {
      console.log("error finding user:", err);
    }
  }

  return (
    <View style={styles.container}>
      <Text>BYGO</Text>
      {/* <TextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      /> */}
      <TextInput
        onChangeText={(val) => setInput("email", val)}
        style={styles.input}
        value={formState.email}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(val) => setInput("password", val)}
        style={styles.input}
        value={formState.password}
        placeholder="Password"
      />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Up" onPress={addUser} />
      {/* {users.map((user, index) => (
        <View key={user.id ? user.id : index} style={styles.user}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user.password}</Text>
        </View>
      ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  userName: { fontSize: 18 },
});

export default LoginPage;

// useEffect(() => {
//   fetchUsers();
// }, []);

// async function fetchUsers() {
//   try {
//     const userData = await API.graphql(graphqlOperation(listUsers));
//     const users = userData.data.listUsers.items;
//     setUsers(users);
//   } catch (err) {
//     console.log("error fetching users", err);
//   }
// }
