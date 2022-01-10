import React from "react";
import { Button, View } from "react-native";

function UserScreen({navigation}) {
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Users List"
          onPress={() => navigation.navigate("UserDetailScreen")}
          color="#19AC52"
        />
      </View>
  );
}

export default UserScreen;
