import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";

// GRAPH QL
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../src/graphql/mutations";
import { fetchUsers } from "../src/custom/queries";

// RECOIL
import { currentUserState } from "../atoms/currentUserState";
import { useRecoilState } from "recoil";

// EXPO ICONS
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      setFormState(initialState);
      toggleLoggedIn();
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  async function signIn() {
    try {
      const user = { ...formState };
      const cuData = await API.graphql(
        graphqlOperation(fetchUsers, { filter: { email: { eq: user.email } } })
      );
      console.log(cuData);
      const cu = cuData.data.listUsers.items[0];
      setCurrentUser(cu);
      setFormState(initialState);
      toggleLoggedIn();
    } catch (err) {
      console.log("error finding user:", err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>bygo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(val) => setInput("email", val)}
            style={styles.input}
            value={formState.email}
            autoCompleteType="password"
            placeholder="Email"
          />
          <TextInput
            onChangeText={(val) => setInput("password", val)}
            style={styles.input}
            value={formState.password}
            autoCompleteType="password"
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={addUser}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems:"center"}}>
        <View style={{ width: "30%", borderBottomWidth: 2, borderColor: "#fff" }}></View>
        <Text style={{color: "#fff", fontSize: 15, margin: 10}}>Or connect with</Text>
        <View style={{ width: "30%", borderBottomWidth: 2, borderColor: "#fff" }}></View>
      </View>
      <View style={styles.oAuthContainer}>
        <TouchableOpacity style={{ margin: 20,  marginBottom: 40 }}>
          <Image
            source={require("../assets/facebookLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={require("../assets/googleLogo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e07870",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    padding: 20,
    width: "100%",
  },
  header: {
    fontSize: 50,
    color: "#fff",
    padding: 20,
  },
  inputContainer: {
    width: "90%",
  },
  input: {
    fontSize: 20,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#5cd943",
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  oAuthContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 20,
    marginBottom: 40
  },
  logo: {
    height: 60,
    width: 60,
  },
});

export default LoginPage;
