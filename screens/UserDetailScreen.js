import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { getDoc, setDoc, doc} from "firebase/firestore";
import { firestore } from "../database/FirebaseDB";

function UserDetailScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    querySnapshot();
  }, []);

  async function querySnapshot() {
    setIsLoading(true);
    const {username} = route.params
    console.log(username)
    await getDoc(doc(firestore, "users", username))
      .then((qs) => {
        if (qs.exists) {
          const { name, mobile, email } = qs.data();
          setName(name);
          setEmail(email);
          setMobile(mobile);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateUser = () => {
    if (name === "") {
      alert("Fill at least your name!");
    } else {
      setIsLoading(true);
      async function updateUser() {
        await setDoc(doc(firestore, "users", name), {
          name: name,
          email: email,
          mobile: mobile,
        });
      }
      updateUser()
        .then(() => {
          setName("");
          setEmail("");
          setMobile("");
          setIsLoading(false);
          Alert.alert(
            "Sucess",
            "User Record Updated Successfully, Navigating to User List",
            [
              { text: "OK", onPress:()=>navigation.navigate("UserScreen"), style: "cancel"}
            ]
          );
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
        <Button title="Update Details" onPress={() => updateUser()} color="#19AC52" />
      </View>
      <View style={styles.button}>
        <Button title="Cancel" onPress={()=> navigation.navigate("UserScreen")} color="red" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default UserDetailScreen;
