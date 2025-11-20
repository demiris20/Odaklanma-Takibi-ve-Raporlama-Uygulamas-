import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ReportsScreen from "./screens/ReportsScreen";

const Tab = createBottomTabNavigator();

export default function App() {

  const [sessions, setSessions] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{ title: "Zamanlayıcı" }}
        >
          {() => (
            <HomeScreen sessions={sessions} setSessions={setSessions} />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Reports"
          options={{ title: "Raporlar" }}
        >
          {() => (
            <ReportsScreen sessions={sessions} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
