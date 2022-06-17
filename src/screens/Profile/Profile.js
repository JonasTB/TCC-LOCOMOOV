import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";

import name from "../../../assets/img/name.png";
import email from "../../../assets/img/email.png";
import cpf from "../../../assets/img/cpf.png";
import registration from "../../../assets/img/registration.png";
import logout from "../../../assets/img/logout.png";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);

  function getUser() {
    AsyncStorage.getItem("user").then((data) => {
      setUser(JSON.parse(data));
    });
  }

  function signOut() {
      AsyncStorage.clear().then(() => {
          navigation.navigate("Login")
      })
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarInitial}>
          {user ? user.name.charAt(0).toUpperCase() : "..."}
        </Text>
      </View>

      <View style={styles.info}>
        <View style={styles.item}>
          <Image resizeMode="contain" style={styles.img} source={name} />
          <Text style={styles.text}>{user ? user.name : "..."}</Text>
        </View>
        <View style={styles.item}>
          <Image resizeMode="contain" style={styles.img} source={email} />
          <Text style={styles.text}>{user ? user.email : "..."}</Text>
        </View>
        <View style={styles.item}>
          <Image resizeMode="contain" style={styles.img} source={cpf} />
          <Text style={styles.text}>{user ? user.cpfUser : "..."}</Text>
        </View>
        <View style={styles.item}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={registration}
          />
          <Text style={styles.text}>{user ? user.matriculation : "..."}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <TouchableOpacity onPress={() => signOut()}>
          <View style={styles.item}>
            <Image source={logout} style={{ height: 30, width: 30 }} />
            <Text style={styles.text}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    backgroundColor: "#ffffff",
    width: 150,
    height: 150,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    color: "#00000030",
    fontSize: 75,
  },
  info: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  text: {
    width: "80%",
    fontSize: 20,
    color: "#092969",
  },
  img: {
    width: 40,
    height: 40,
  },
});
