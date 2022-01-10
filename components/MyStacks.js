import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddUserScreen from "../screens/AddUserScreen";
import UserScreen from "../screens/UserScreen";
import UserDetailScreen from "../screens/UserDetailScreen";

function MyStacks() {
  const Stack = createStackNavigator();

  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#621FF7",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="AddUserScreen"
          component={AddUserScreen}
          options={{ title: "Add User" }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ title: "Users List" }}
        />
        <Stack.Screen
          name="UserDetailScreen"
          component={UserDetailScreen}
          options={{ title: "User Detail" }}
        />
      </Stack.Navigator>
  );
}

export default MyStacks;
