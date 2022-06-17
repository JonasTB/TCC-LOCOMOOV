import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import background from "../../../assets/img/loginbackground.jpg";
import logo from "../../../assets/img/locomoovLogo.png";
import Toast from "react-native-toast-message";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width;

export default function Login({ navigation }) {
  const showToast = (msg, msg2, type) => {
    Toast.show({
      type: type,
      text1: msg,
      text2: msg2,
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    setLoading(true)
    console.log(email);
    console.log(password);
    // navigation.navigate("Home");
    // if (password == "123") {
    //   showToast("Deu bom!", "Usuário logado com sucesso", "success");
    // } else {
    //   showToast("Erro", "Erro ao logar no sistema", "error");
    // }
    fetch("https://locomov-tcc.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        await AsyncStorage.setItem("user", JSON.stringify(data.user)).then(
          async () => {
            await AsyncStorage.setItem("token", data.token).then(() => {
              setEmail("");
              setPassword("");
              setLoading(false)
              navigation.replace("Home");
            });
          }
        );
      })
      .catch((error) => {
        showToast("Erro", "Erro ao logar no sistema", "error");
        setLoading(false)
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ActivityIndicator style={{zIndex: 10, backgroundColor: "#00000099", height: '120%', width: '100%'}} color="#fff" />
      ) : (
        <></>
      )}
      <View style={styles.container}>
        <Toast />
        <Image style={styles.backImg} source={background} />
        <View style={styles.overlay}></View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputs}
        >
          <TextInput
            style={styles.registration}
            placeholder="Matrícula"
            placeholderTextColor="rgba(255,255,255, 0.6)"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="rgba(255,255,255, 0.6)"
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <View style={styles.btContainer}>
            <Button
              title="Acessar"
              color="rgb(9, 41, 105)"
              accessibilityLabel="Login Button"
              onPress={() => {
                login(email, password);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    height: "100%",
    width: "100%",
    zIndex: -2,
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(9, 41, 105, 0.8)",
    zIndex: -1,
  },
  logoContainer: {
    height: ((1083 / 906) * width) / 3,
    width: "33.3%",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  inputs: {
    width: "80%",
    marginVertical: "30%",
  },
  registration: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    fontSize: 16,
    paddingBottom: 10,
    marginBottom: 20,
    color: "white",
  },
  password: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    fontSize: 16,
    paddingBottom: 10,
    color: "white",
  },
  btContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    marginTop: 20,
  },
});
