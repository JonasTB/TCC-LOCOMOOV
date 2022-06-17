import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import CountDown from "react-native-countdown-component";
import React, { useState, useEffect } from "react";
import locker from "../../../assets/img/locker.png";

export default function Unlockd() {
  const [time, setTime] = useState(15);

  // let counter = () => {
  //     setInterval(() => {
  //         let newTime = time;
  //         newTime--
  //         setTime(newTime)
  //     }, 1000)
  // }

  // counter()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.unlockTop}>
        <View style={styles.lockerBg}>
          <Image source={locker} />
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
              timeLabels={{m: null, s: null}}
            />
          </View>
          <Text style={styles.bottomText}>minutos</Text>
        </View>
        <View style={styles.secondLine}>
          <Text style={styles.bottomText}>Para entregá-lo no destino.</Text>
        </View>
      </View>
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
});
