import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet, ScrollView, ActivityIndicator, Text, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { firestore } from "../database/FirebaseDB";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { Button } from "react-native-elements/dist/buttons/Button";

function UserScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    querySnapshot();
  }, []);

  async function querySnapshot() {
    const tempArr = [];
    await getDocs(collection(firestore, "users"))
      .then((qs) => {
        qs.forEach((doc) => {
          const { name, mobile, email } = doc.data();
          const id = doc.id;
          tempArr.push({
            id,
            name,
            mobile,
            email,
          });
        });
        setIsLoading(false);
        setUserArray(tempArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteUser = (name) => {
    setIsLoading(true);
    async function deleteUser() {
      await deleteDoc(doc(firestore, "users", name));
    }
    deleteUser()
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          "Sucess",
          "User Record Deleted Successfully",
          [
            { text: "OK", style: "cancel"}
          ]
        );
        navigation.navigate("UserScreen");
      })
      .catch((err) => {
        console.error("Error found: ", err);
        setIsLoading(false);
      });
  };

  const openTwoButtonAlert = (name) => {
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => deleteUser(name)},
        {text: 'No', style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{ padding: 20 }}>
        Swipe Left to View more Information, and Right To Delete User
      </Text>
      {userArray.map((item, i) => {
        return (
          <ListItem.Swipeable
            leftContent={
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate("UserDetailScreen", {
                    username: item.id,
                  });
                }}
                icon={{ name: "info", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "green" }}
              />
            }
            rightContent={
              <Button
                title="Delete"
                onPress={() => {
                  openTwoButtonAlert(item.id)
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            }
            key={i}
          >
            <ListItem.Content>
              <ListItem.Title>{item.id}</ListItem.Title>
              <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
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

export default UserScreen;
