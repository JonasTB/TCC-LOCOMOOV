import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import { BarCodeScanner } from "expo-barcode-scanner";

import scooters from "../../../assets/img/scooters.png";
import scooter from "../../../assets/img/scooter.png";
import qrcode from "../../../assets/img/qrcode.png";
import profileIcon from "../../../assets/img/profile.jpg";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [pinSelected, setPinSelected] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [spots, setSpots] = useState(null);
  const [tipPage, setTipPage] = useState(1);

  const [scooterId, setScooterId] = useState();

  const [destiny, setDestiny] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanned(false);
      getSpots();
      console.log("---//--- Reseting ---//---");
    })();
  }, []);

  const getSpots = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("https://locomov-tcc.herokuapp.com/locality", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setSpots(data);
        console.log(data[2]);
      });
  };

  const unlockScooter = async () => {
    AsyncStorage.getItem("user").then(async (user) => {
      console.log("userId", JSON.parse(user)._id);
      console.log("scooterId", scooterId);
      console.log("destinyId", destiny);
      const token = await AsyncStorage.getItem("token");
      fetch("https://locomov-tcc.herokuapp.com/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          user_id: JSON.parse(user)._id,
          scooter_id: scooterId,
          final_locallity: destiny,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          // Alert.alert("Alerta", `Patinete ${data._id} desbloqueado!`, [
          //   { text: "OK", onPress: () => {
              setScanned(false)
              navigation.replace("Unlocked");
          //   }},
          // ]);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    });
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScooterId(data);
    setScanned(true);
    setScanning(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function selectSpot(spot) {
    if (!scanned) {
      let spotList = [...spots];
      let index = spots.findIndex((s) => s._id === spot._id);

      if (!spot.selected) {
        spot.selected = true;
        spotList[index] = spot;
        setSpots(spotList);
      } else {
        spot.selected = false;
        spotList[index] = spot;
        setSpots(spotList);
      }
    } else {
      setDestiny(spot._id);
      console.log("spot id", destiny);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {scanned ? (
        <Text style={styles.selectDestiny}>
          Selecione seu de destino abaixo
        </Text>
      ) : (
        <></>
      )}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -3.769151,
          longitude: -38.479539,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      >
        {spots ? (
          <>
            {spots.map((spot) => {
              return (
                <View key={spot._id}>
                  <MapView.Circle
                    center={{
                      latitude: parseFloat(spot.lat),
                      longitude: parseFloat(spot.long),
                    }}
                    radius={30}
                    strokeWidth={1}
                    strokeColor={
                      spot.scootersAvailable == 0
                        ? "#e06969"
                        : spot.scootersAvailable >= 3
                        ? "#00e363"
                        : "#e3d000"
                    }
                    fillColor={
                      spot.scootersAvailable == 0
                        ? "#e0696930"
                        : spot.scootersAvailable >= 3
                        ? "#00e36330"
                        : "#e3d00030"
                    }
                  ></MapView.Circle>

                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(spot.lat),
                      longitude: parseFloat(spot.long),
                    }}
                    title={"Vaga"}
                    onSelect={() => selectSpot(spot)}
                    onDeselect={() => selectSpot(spot)}
                  >
                    {spot.selected ? (
                      <View style={styles.spotInfo}>
                        <View style={styles.infoOption}>
                          <View
                            style={[
                              styles.value,
                              { backgroundColor: "#04C300" },
                            ]}
                          >
                            <Text style={styles.valueNumber}>
                              {spot.scootersAvailable}
                            </Text>
                          </View>
                          <Text>Disponíveis</Text>
                        </View>
                        <View style={styles.infoOption}>
                          <View
                            style={[
                              styles.value,
                              { backgroundColor: "#A7B600" },
                            ]}
                          >
                            <Text style={styles.valueNumber}>
                              {spot.parkingAvailable}
                            </Text>
                          </View>
                          <Text>Vagas</Text>
                        </View>
                        <View style={styles.infoOption}>
                          <View
                            style={[
                              styles.value,
                              { backgroundColor: "#C30000" },
                            ]}
                          >
                            <Text style={styles.valueNumber}>
                              {spot.scootersMaintenance}
                            </Text>
                          </View>
                          <Text>Manutenção</Text>
                        </View>
                      </View>
                    ) : (
                      <Image
                        source={scooter}
                        style={styles.scooterIcon}
                      ></Image>
                    )}
                  </MapView.Marker>
                </View>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </MapView>
      <ImageBackground source={scooters} style={styles.scootersImage}>
        {scanning ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            >
              <TouchableOpacity onPress={() => setScanning(false)}>
                <Text style={{ color: "white", fontSize: 50, margin: 8 }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </BarCodeScanner>
          </>
        ) : scanned ? (
          <View style={styles.lowContainer}>
            {destiny ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  borderRadius: 32,
                  position: "absolute",
                  bottom: 64,
                }}
                onPress={() => {
                  unlockScooter();
                }}
              >
                <Text style={styles.confirmButton}>CONFIRMAR</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View style={styles.lowContainer}>
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeCardTitle}>Bem vindo!</Text>

              {tipPage == 1 ? (
                <Text style={styles.welcomeCardDesc}>
                  Para utilizar o locomoov, basta ir em um dos pontos exibidos
                  acima, escanear o QR Code localizado na base do patinete,
                  definir seu destino e desbloquear.
                </Text>
              ) : (
                <Text style={styles.welcomeCardDesc}>
                  Ao chegar no destino, desligue o patinete, encaixe-o na vaga
                  selecionada e plugue-o na tomada.
                </Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  tipPage == 1 ? setTipPage(2) : setTipPage(1);
                }}
                style={styles.nextTip}
              >
                {tipPage == 1 ? (
                  <Text style={styles.arrowRight}>►</Text>
                ) : (
                  <Text style={styles.arrowLeft}>◄</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setScanning(true)}
            >
              <Image source={qrcode}></Image>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
  },
  map: {
    height: "50%",
  },
  scootersImage: {
    flex: 1,
    height: "110%",
    position: "relative",
  },
  lowContainer: {
    position: "absolute",
    height: "110%",
    width: "100%",
    backgroundColor: "rgba(9, 41, 105, 0.8)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  welcomeCard: {
    width: "80%",
    minHeight: "50%",
    backgroundColor: "#011848",
    borderRadius: 20,
    borderColor: "#092969",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  welcomeCardTitle: {
    color: "white",
    textAlign: "center",
    margin: 24,
    fontSize: 20,
  },
  welcomeCardDesc: {
    color: "white",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  scanButton: {
    backgroundColor: "#092969",
    padding: 16,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  scooterIcon: {
    height: 50,
    width: 50,
  },
  spotInfo: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    display: "flex",
    flexDirection: "column",
  },
  infoOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  value: {
    width: 20,
    height: 20,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  valueNumber: {
    color: "white",
  },

  scanner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  nextTip: {
    zIndex: 10,
    position: "absolute",
    bottom: 5,
    right: 15,
    left: 15,
  },
  arrowRight: {
    color: "white",
    fontSize: 30,
    textAlign: "right",
  },
  arrowLeft: {
    color: "white",
    fontSize: 30,
    textAlign: "left",
  },
  selectDestiny: {
    fontSize: 20,
    backgroundColor: "#092969",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 16,
  },
  confirmButton: {
    color: "#092969",
    padding: 16,
    textAlign: "center",
  },
});
