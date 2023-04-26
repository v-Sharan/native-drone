import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const Footer = () => {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{ backgroundColor: "#F3F4F8", borderRadius: 20, padding: 30 }}
        onPress={() => {
          Linking.openURL("tel:+91 94448 30611");
        }}
      >
        <Text style={styles.text}>HelpLine Number</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 20,
            gap: 10,
          }}
        >
          <Feather name="phone-call" size={24} color="black" />
          <Text style={styles.number}>94448 30611</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: { fontSize: 30, textAlign: "center" },
  number: { fontSize: 20 },
});
export default Footer;
