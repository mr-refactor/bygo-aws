import React, { useEffect, useState } from "react";

// AMPLIFY
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

// GRAPHQL

import { createUser } from "./src/graphql/mutations";
import { listUsers } from "./src/graphql/queries";

// Authorization
// import { withAuthenticator } from 'aws-amplify-react-native'

import { StyleSheet, Text, TextInput, Button, View } from "react-native";

const initialState = { name: "", email: "", password: ""};

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchUsers() {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      const users = userData.data.listUsers.items;
      setUsers(users);
    } catch (err) {
      console.log("error fetching users", err);
    }
  }

  async function addUser() {
    try {
      const user = { ...formState };
      console.log(user)
      setUsers([...users, user]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUser, {input: user}));
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
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
      <Button title="Sign Up" onPress={addUser} />
      {
      users.map((user, index) => (
        <View key={user.id ? user.id : index} style={styles.user}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user.password}</Text>
        </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  user: {  marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  userName: { fontSize: 18 }
});

export default App;
