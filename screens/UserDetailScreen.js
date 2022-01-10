import React from "react";
import { Button, View } from "react-native";

function UserDetailScreen({navigation}) {
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Users List"
          onPress={() => navigation.navigate("EditUserScreen")}
          color="#19AC52"
        />
      </View>
  );
}

export default UserDetailScreen;
