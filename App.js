import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import OptionSelect from "./components/OptionSelect";
import {
  fireRemoveBg,
  CarCrash,
  Cardiac,
  Epilepsy,
  hara,
  snake,
} from "./assets";
import axios from "axios";
import * as Location from "expo-location";
import Footer from "./components/Footer";

export default function App() {
  const [location, setLocation] = useState();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reCapta, setReCapta] = useState("");
  const [enteredRecapta, setEnteredRecapta] = useState("");
  const [isRreCapta, setIsReCapta] = useState(false);
  const [type, setType] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const handleSendLocation = async () => {
    getLocation();
    if (enteredRecapta == reCapta) {
      setLoading(true);
      const data = {
        ...location,
        type,
      };
      axios
        .post("https://medical-uav.onrender.com/api/medicaluav", data)
        .then((res) => {
          setIsMessage(true);
          setMessage(res.data.message);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
          setIsReCapta(false);
        });
    } else {
      setIsError(true);
      setError("Check the Capta Try again");
    }
    setIsReCapta(false);
  };

  const handleCapta = () => {
    setIsReCapta(true);
    setReCapta(Math.floor(Math.random() * 1000) + 1);
  };

  return (
    <>
      <Text style={{ fontSize: 48, paddingTop: 45 }}>Flying Escort</Text>
      <ScrollView>
        <View style={styles.container}>
          {loading && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={loading}
              onRequestClose={() => {
                setLoading(!loading);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ActivityIndicator size={"large"} color={"#00ff00"} />
                  <Text>Loading..</Text>
                </View>
              </View>
            </Modal>
          )}
          {isMessage && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isMessage}
              onRequestClose={() => {
                setIsMessage(!isMessage);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>{message}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{ padding: 10, color: "white" }}
                      onPress={() => {
                        setIsMessage(false);
                      }}
                    >
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          {isError && (
            <Modal animationType="slide" transparent={true} visible={!!error}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>{error}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setIsError(false);
                    }}
                  >
                    <Text
                      style={{ padding: 10, color: "white" }}
                      onPress={() => {
                        setIsError(false);
                      }}
                    >
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          {isRreCapta && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                padding: 10,
                gap: 12,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 100 }}>
                {reCapta}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Enter the Above shown Number
              </Text>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "#F3F4F8",
                  borderRadius: 12,
                  paddingLeft: 10,
                }}
                onChangeText={(text) => {
                  setEnteredRecapta(text);
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "black", borderRadius: 10 }}
                  onPress={handleSendLocation}
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 10,
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: "black", borderRadius: 10 }}
                  onPress={() => {
                    setIsReCapta(false);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 10,
                      textAlign: "center",
                    }}
                  >
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {!loading && !isRreCapta && !isError && !isMessage && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 25,
                paddingTop: 30,
              }}
            >
              <OptionSelect
                title={"Fire"}
                imgUrl={fireRemoveBg}
                dimesion={100}
                onPressHandle={() => {
                  handleCapta();
                  setType("Fire");
                }}
              />
              <OptionSelect
                title={"Road Accident"}
                imgUrl={CarCrash}
                dimesion={120}
                onPressHandle={() => {
                  handleCapta();
                  setType("Road Accident");
                }}
              />
              <OptionSelect
                title={"Cardiac Arrest"}
                imgUrl={Cardiac}
                dimesion={100}
                onPressHandle={() => {
                  handleCapta();
                  setType("Cardiac Arrest");
                }}
              />
              <OptionSelect
                title={"Epilepsy"}
                onPressHandle={() => {
                  handleCapta();
                  setType("Epilepsy");
                }}
                imgUrl={Epilepsy}
                dimesion={130}
              />
              <OptionSelect
                title={"Harassment"}
                onPressHandle={() => {
                  handleCapta();
                  setType("Harassment");
                }}
                imgUrl={hara}
                dimesion={100}
              />
              <OptionSelect
                title={"Snake Bite"}
                onPressHandle={() => {
                  handleCapta();
                  setType("Snake Bite");
                }}
                imgUrl={snake}
                dimesion={100}
              />
            </View>
          )}
          {!loading && !isRreCapta && !isError && !isMessage && <Footer />}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
