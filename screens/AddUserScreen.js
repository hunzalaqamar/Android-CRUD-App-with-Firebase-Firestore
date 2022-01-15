import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";

import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../database/FirebaseDB";

function AddUserScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const storeUser = () => {
    if (name === "") {
      alert("Fill at least your name!");
    } else {
      setIsLoading(true);
      async function setUser() {
        await setDoc(doc(firestore, "users", name), {
          name: name,
          email: email,
          mobile: mobile,
        });
      }
      setUser()
        .then((res) => {
          Alert.alert(
            "Sucess",
            "User Record Added Successfully, Navigating to User List",
            [
              { text: "OK", onPress:()=>navigation.navigate("UserScreen"), style: "cancel"}
            ]
          );
          setName("");
          setEmail("");
          setMobile("");
          setIsLoading(false);
          
        })
        .catch((err) => {
          console.error("Error found: ", err);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Name"}
          value={name}
          onChangeText={(val) => setName(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"Email"}
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Mobile"}
          value={mobile}
          onChangeText={(val) => setMobile(val)}
        />
      </View>
      <View style={styles.button}>
        <Button title="Add User" onPress={() => storeUser()} color="#19AC52" />
      </View>
      <View style={styles.button}>
        <Button title="View Users" onPress={()=> navigation.navigate("UserScreen")} color="#19AC52" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    marginTop: 10, 
  }
});

export default AddUserScreen;
