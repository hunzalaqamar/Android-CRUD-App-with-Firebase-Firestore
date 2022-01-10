import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../database/FirebaseDB";

function AddUserScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //adding & updating done
  // setDoc(doc(firestore, "users", "AA2"), {
  //   name: "65",
  //   email: "65@",
  //   mobile: "nk"
  // });

  //reading data
  // const docRef = doc(firestore, "users", "AA2");
  // async function docSnap(){
  //   return await getDoc(docRef);
  // }

  // docSnap().then(data =>{
  //   if (data.exists()) {
  //     console.log("Document data:", data.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   };
  // })

  //deleting data

  // async function delDoc(){
  //   await deleteDoc(doc(firestore, "users", "gG7LXl1QhoXIOwBYiT7e"));
  // }

  // delDoc().then(res=>{
  //   console.log("Done For!!!!")
  // })

  const storeUser = () => {
    if (name === "") {
      alert("Fill at least your name!");
    } else {
      setIsLoading(true);
      async function setUser() {
        await setDoc(doc(firestore, "users", "AA3"), {
          name: name,
          email: email,
          mobile: mobile,
        });
      }
      setUser()
        .then((res) => {
          setName("");
          setEmail("");
          setMobile("");
          setIsLoading(false);
          navigation.navigate("UserScreen");
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
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
});

export default AddUserScreen;
