import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login/Login";
import Home from "./src/screens/Home/Home";
import Profile from "./src/screens/Profile/Profile";
import Unlocked from "./src/screens/Unlocked/Unlockd"
import { Image, Text, TouchableOpacity } from "react-native";
import profileIcon from "./assets/img/profile.jpg";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ position: "relative" }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "LOCOMOOV",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile");
                }}
                style={{ zIndex: 1, position: "absolute", right: 0 }}
              >
                <Image
                  source={profileIcon}
                  style={{ width: 30 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#092969",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Perfil",
            headerStyle: {
              backgroundColor: "#092969",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackTitle: "Início",
          }}
        />

        <Stack.Screen
          name="Unlocked"
          component={Unlocked}
          options={{ title: "Unlocked", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
