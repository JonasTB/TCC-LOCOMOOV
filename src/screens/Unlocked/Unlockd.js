import { View, Text, SafeAreaView, StyleSheet, Image, Button, TouchableWithoutFeedback } from "react-native";
import CountDown from "react-native-countdown-component";
import React, { useState, useEffect } from "react";
import locker from "../../../assets/img/locker.png";
import correct from "../../../assets/img/correct.png";
export default function Unlockd({ navigation }) {
  const [time, setTime] = useState(15);

  // let counter = () => {
  //     setInterval(() => {
  //         let newTime = time;
  //         newTime--
  //         setTime(newTime)
  //     }, 1000)
  // }

  // counter()

  const [scooterDelivered, setScooterDelivered] = useState(false)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.unlockTop}>
        <View style={styles.lockerBg}>
          <TouchableWithoutFeedback onPress={() => {
                setScooterDelivered(true)
              }}>
            <Image source={locker} />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.unlockedText}>Patinete desbloqueado!</Text>
      </View>
      <View style={styles.unlockBottom}>
        <View style={styles.firstLine}>
          <Text style={styles.bottomText}>Você tem</Text>
          <View style={styles.timeLeft}>
            <CountDown
              until={60 * 15}
              timeToShow={["M", "S"]}
              size={20}
              digitStyle={{ backgroundColor: "#092969" }}
              digitTxtStyle={{ color: "#fff" }}
              timeLabels={{ m: null, s: null }}
            />
          </View>
          <Text style={styles.bottomText}>minutos</Text>
        </View>
        <View style={styles.secondLine}>
          <Text style={styles.bottomText}>Para entregá-lo no destino.</Text>
        </View>
      </View>
      {scooterDelivered ?
        <View style={styles.delivered}>
          <View style={styles.thanks}>
            <Image source={correct} style={styles.correctIcon} />
            <Text style={styles.deliveredText}>Patinete devolvido com sucesso.</Text>
            <Text style={styles.thanksText}>Obrigado!</Text>
          </View>
          <View style={styles.menuButton}>
            <Button
              title="Voltar ao menu"
              color="green"
              accessibilityLabel="Login Button"
              onPress={() => {
                navigation.replace("Home");
              }}
            />
          </View>
        </View>
      :
      <></>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#001745",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  lockerBg: {
    backgroundColor: "#092969",
    padding: 64,
    borderRadius: 1000,
  },
  unlockTop: {
    display: "flex",
    flexDirection: "column",
  },
  unlockedText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  unlockBottom: {},
  firstLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  secondLine: {},
  bottomText: {
    color: "white",
    fontSize: 18,
  },
  timeLeft: {
    marginHorizontal: 8,
  },
  delivered: {
    backgroundColor: "#23ad00",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    display: 'flex',
    justifyContent: "center",
  },
  thanks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctIcon: {
    height: "35%",
    width: "35%",
  },
  deliveredText: {
    color: 'white',
    fontSize: 24,
    marginTop: 64
  },
  thanksText: {
    marginTop: 16,
    color: 'white',
    fontSize: 24
  },
  menuButton: {
    backgroundColor: 'white',
    margin: 80,
    borderRadius: 50
  }
});
